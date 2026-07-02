import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  service,
  message,
}) => (
  <div style={{ backgroundColor: '#f3f4f6', padding: '40px 0', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    }}>

      {/* Hero Header - Black Brand Background */}
      <div style={{ backgroundColor: '#000000', padding: '35px 40px', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700', margin: '0', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Pivotal Builders
        </h1>
        <p style={{ color: '#888888', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', margin: '10px 0 0' }}>
          New Project Inquiry
        </p>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '40px 40px 50px' }}>

        {/* Client Details Grid */}
        <div style={{ paddingBottom: '30px', borderBottom: '1px solid #eeeeee' }}>
           <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#000000', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
             Client Details
           </h2>

           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
             <tbody>
               <tr>
                 <td style={{ paddingBottom: '20px', color: '#888888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', width: '100px', verticalAlign: 'top' }}>Name</td>
                 <td style={{ paddingBottom: '20px', color: '#111111', fontSize: '16px', fontWeight: '500', verticalAlign: 'top' }}>{name}</td>
               </tr>
               <tr>
                 <td style={{ paddingBottom: '20px', color: '#888888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', verticalAlign: 'top' }}>Service</td>
                 <td style={{ paddingBottom: '20px', color: '#111111', fontSize: '16px', fontWeight: '500', verticalAlign: 'top' }}>
                    <span style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>
                      {service}
                    </span>
                 </td>
               </tr>
               <tr>
                 <td style={{ paddingBottom: '20px', color: '#888888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', verticalAlign: 'top' }}>Email</td>
                 <td style={{ paddingBottom: '20px', verticalAlign: 'top' }}>
                   <a href={`mailto:${email}`} style={{ color: '#000000', textDecoration: 'underline', fontSize: '16px', fontWeight: '500' }}>{email}</a>
                 </td>
               </tr>
               <tr>
                 <td style={{ color: '#888888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', verticalAlign: 'top' }}>Phone</td>
                 <td style={{ verticalAlign: 'top' }}>
                   <a href={`tel:${phone}`} style={{ color: '#000000', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>{phone}</a>
                 </td>
               </tr>
             </tbody>
           </table>
        </div>

        {/* Message Section */}
        <div style={{ paddingTop: '30px' }}>
           <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#000000', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
             Project Vision
           </h2>
           <div style={{ backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #000000' }}>
             <p style={{ margin: '0', fontSize: '15px', lineHeight: '1.7', color: '#333333', whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>
               "{message}"
             </p>
           </div>
        </div>

        {/* Call to Action Button */}
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          <a href={`mailto:${email}?subject=Re: Your Project Inquiry - Pivotal Builders`} style={{
            display: 'inline-block',
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '18px 40px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '1px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            REPLY TO CLIENT
          </a>
        </div>

      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '25px', textAlign: 'center', borderTop: '1px solid #eeeeee' }}>
        <p style={{ margin: '0', fontSize: '11px', color: '#999999', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Securely transmitted via pivotalbuildersinc.com
        </p>
      </div>

    </div>
  </div>
);