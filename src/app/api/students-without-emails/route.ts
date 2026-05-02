import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function createSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase admin environment variables are not configured.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "20");
    const query = (searchParams.get("query") || "").trim().toLowerCase();

    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit =
      Number.isFinite(limit) && limit > 0 && limit <= 100 ? limit : 20;
    const offset = (safePage - 1) * safeLimit;
    const rangeEnd = offset + safeLimit - 1;

    const supabase = createSupabaseAdmin();

    // First, get all students
    const { data: allStudents, error: studentsError } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (studentsError) {
      throw studentsError;
    }

    if (!allStudents) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination: {
          page: safePage,
          limit: safeLimit,
          total: 0,
          totalPages: 0,
        },
      });
    }

    // Get all students who have received emails
    const { data: emailStudents, error: emailError } = await supabase
      .from('email_followups')
      .select('student_id')
      .eq('status', 'sent');

    if (emailError) {
      throw emailError;
    }

    // Get set of student IDs who have received emails
    const emailedStudentIds = new Set(
      (emailStudents || []).map(item => item.student_id)
    );

    // Filter students who haven't received emails
    let studentsWithoutEmails = allStudents.filter(
      student => !emailedStudentIds.has(student.id)
    );

    // Apply search filter if provided
    if (query) {
      studentsWithoutEmails = studentsWithoutEmails.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query)
      );
    }

    // Get total count
    const totalCount = studentsWithoutEmails.length;

    // Apply pagination
    const paginatedStudents = studentsWithoutEmails.slice(offset, rangeEnd + 1);

    // Get all students to determine original positions (EXACT same logic as main student list)
    const { data: allStudentsForPositions, error: positionError } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (positionError) {
      throw positionError;
    }

    // Create a map of student ID to their position (EXACT same logic as fetchStudents -> mapSupabaseStudent)
    const studentPositions = new Map();
    (allStudentsForPositions || []).forEach((student, index) => {
      studentPositions.set(student.id, index + 1); // This is exactly what mapSupabaseStudent does: id: index + 1
    });

    // Format the response using the exact same positioning logic
    const formattedStudents = paginatedStudents.map((student, index) => {
      const originalPosition = studentPositions.get(student.id);
      return {
        id: originalPosition || index + 1, // Use exact position from main list
        publicStudentId: student.public_student_id || `STU-${student.id}`,
        name: student.name,
        email: student.email,
        phone: student.phone,
        course: student.course,
        regDate: student.reg_date,
        regTime: student.reg_time,
        paymentPlan: student.payment_plan,
        amountPaid: student.amount_paid,
        balanceRemaining: student.balance_remaining,
        status: student.status,
        timestamp: student.timestamp,
        gender: student.gender,
        stateOfResidence: student.state_of_residence,
        learningTrack: student.learning_track,
        howDidYouHear: student.how_did_you_hear,
        hasLaptopAndInternet: student.has_laptop_and_internet,
        currentEmploymentStatus: student.current_employment_status,
        wantsScholarship: student.wants_scholarship,
        whyLearnThisSkill: student.why_learn_this_skill,
        lastProgress: student.last_progress,
        originalId: student.id,
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedStudents,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total: totalCount,
        totalPages: Math.max(1, Math.ceil(totalCount / safeLimit)),
      },
    });
  } catch (error) {
    console.error("Error fetching students without emails:", error);
    return NextResponse.json(
      { error: "Failed to fetch students without emails." },
      { status: 500 },
    );
  }
}
