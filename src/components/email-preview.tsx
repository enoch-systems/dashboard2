"use client";

import React, { useState } from 'react';
import { EmailData, emailTemplates, getEmailSubject } from '@/lib/email-templates';

const EmailPreview: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<'welcome' | 'payment_confirmation' | 'group_redirection'>('welcome');
  const [emailData, setEmailData] = useState<EmailData>({
    studentName: 'John Doe',
    courseName: 'Full Stack Development',
    startDate: '20th May, 2026',
    scholarshipDate: '4th December, 2025',
    orientationDate: '20th May, 2026 at 10:00 AM',
    communityWhatsappLink: 'https://chat.whatsapp.com/Bi5XuFToVdjBPRvIawWz5W',
    paymentType: 'Fully Paid',
    amountPaid: 50000,
    paymentDate: new Date().toLocaleDateString('en-GB'),
    email: 'john.doe@example.com'
  });

  const handleDataChange = (field: keyof EmailData, value: string | number) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  const getPreviewHtml = () => {
    const template = emailTemplates[selectedTemplate];
    return template(emailData);
  };

  const getSubject = () => {
    return getEmailSubject(selectedTemplate, emailData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Email Template Preview</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Select Template</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="welcome"
                    checked={selectedTemplate === 'welcome'}
                    onChange={(e) => setSelectedTemplate(e.target.value as any)}
                    className="text-blue-600"
                  />
                  <span>Welcome Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="payment_confirmation"
                    checked={selectedTemplate === 'payment_confirmation'}
                    onChange={(e) => setSelectedTemplate(e.target.value as any)}
                    className="text-blue-600"
                  />
                  <span>Payment Confirmation</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="group_redirection"
                    checked={selectedTemplate === 'group_redirection'}
                    onChange={(e) => setSelectedTemplate(e.target.value as any)}
                    className="text-blue-600"
                  />
                  <span>Group Redirection</span>
                </label>
              </div>
            </div>

            {/* Email Data Configuration */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Email Data</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    value={emailData.studentName}
                    onChange={(e) => handleDataChange('studentName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <select
                    value={emailData.courseName}
                    onChange={(e) => handleDataChange('courseName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a course...</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Data Science">Data Science</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Computer Networking">Computer Networking</option>
                    <option value="Ethical Hacking">Ethical Hacking</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={emailData.startDate}
                    onChange={(e) => handleDataChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Orientation Date</label>
                  <input
                    type="text"
                    value={emailData.orientationDate}
                    onChange={(e) => handleDataChange('orientationDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {(selectedTemplate === 'payment_confirmation' || selectedTemplate === 'welcome') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                      <select
                        value={emailData.paymentType}
                        onChange={(e) => handleDataChange('paymentType', e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Fully Paid">Fully Paid</option>
                        <option value="1st Installment">1st Installment</option>
                        <option value="2nd Installment">2nd Installment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
                      <input
                        type="number"
                        value={emailData.amountPaid}
                        onChange={(e) => handleDataChange('amountPaid', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Link</label>
                  <input
                    type="text"
                    value={emailData.communityWhatsappLink}
                    onChange={(e) => handleDataChange('communityWhatsappLink', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Email Preview</h2>
                <div className="text-sm text-gray-500">
                  Subject: <span className="font-medium">{getSubject()}</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-sm text-gray-600">Email Preview</span>
                  </div>
                </div>
                
                <div className="bg-white" style={{ maxHeight: '800px', overflow: 'auto' }}>
                  <iframe
                    srcDoc={getPreviewHtml()}
                    style={{ width: '100%', height: '800px', border: 'none' }}
                    title="Email Preview"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    const html = getPreviewHtml();
                    const blob = new Blob([html], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `email-${selectedTemplate}-${Date.now()}.html`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Download HTML
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
