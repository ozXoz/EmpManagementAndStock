import React from 'react';
import '../css/Pricing.css';

function Pricing() {
  const plansDetails = [
    { title: 'BASIC', price: 5, users: '5 users', storage: '100mb', extra: 'Admin dashboard',extra2:'Only Canada' },
    { title: 'STANDARD', price: 15, users: '15 users', storage: '500mb', extra: 'Admin dashboard',extra2:'Only Canada' },
    { title: 'PREMIUM', price: 25, users: '500 users', storage: '1gb', extra: 'Admin dashboard & 7/24 live support' ,extra2:'OTP Login & All Contries' }
  ];

  return (
    <div className="pricing-container">
      <div className="header">
        <span>YOUR LOGO</span>
        
      </div>
      <div className="pricing-title">PRICING TABLE</div>
      <div className="pricing-table">
        {plansDetails.map((plan, index) => (
          <div className="plan" key={index}>
            <div className="plan-title">{plan.title}</div>
            <div className="plan-price">${plan.price}</div>
            <div className="features">
              <div>{plan.users}</div>
              <div>{plan.storage} write/read</div>
              <div>{plan.extra}</div>
              <div>{plan.extra2}</div>
            </div>
            <button className="buy-btn">BUY NOW</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
