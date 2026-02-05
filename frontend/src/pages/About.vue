<template>
  <div class="about-page">
    <section class="section">
      <div class="container">
        <div class="about-header">
          <img src="/sandeepsir.jpeg" alt="Dr. Sandeep Sharma" class="founder-photo" />
          <div class="founder-info">
            <h1>Dr. Sandeep Sharma</h1>
            <p class="hindi-text">(शिक्षा श्री, साहित्य रत्न, साहित्य श्री)</p>
            <p class="qualification">(EX. SCINDIA)</p>
            <p class="degrees">M.A. (Gold Medalist) | B.Ed. (Gold Medalist) | Ph.D. (Delhi University)</p>
          </div>
        </div>

        <div class="about-content">
          <div class="about-section card">
            <h2>About Us</h2>
            <p>
              THE SANDEEP SIR CLASSES stands as a beacon of intellectual equity. We operate at the 
              intersection of philanthropy and pedagogy, dedicated to those marginalized by economic 
              hardship. Our platform serves as a digital repository of knowledge, curated specifically 
              for scholars who possess the fire of ambition but lack the material means to sustain 
              formal schooling.
            </p>
          </div>

          <div class="about-section card">
            <h2>Mission</h2>
            <p>
              To eradicate the educational divide by providing an exhaustive archive of academic 
              resources. We seek to empower the disenfranchised through the gift of literacy, ensuring 
              that no intellect remains dormant due to the burden of penury.
            </p>
          </div>

          <div class="about-section card">
            <h2>Vision</h2>
            <p>
              To foster a global renaissance where merit is the sole currency of success. We envision 
              an egalitarian society where the light of erudition reaches the darkest corners of 
              society, transforming "the forgotten" into the leaders of tomorrow.
            </p>
          </div>

          <div class="divider"></div>

          <div class="about-section card hindi-text">
            <h2>परिचय</h2>
            <p>
              संदीप सर क्लासेज शिक्षा के क्षेत्र में एक ऐसी अग्रणी संस्था है जो केवल सेवाभाव से प्रेरित है। 
              हमारा उद्देश्य उन मेधावी विद्यार्थियों को संबल प्रदान करना है जो आर्थिक अभावों के कारण 
              औपचारिक शिक्षा की मुख्यधारा से वंचित रह जाते हैं। यह पोर्टल ज्ञान का एक ऐसा अक्षय कोष है, 
              जहाँ निर्धनता शिक्षा के मार्ग में बाधा नहीं बनती।
            </p>
          </div>

          <div class="about-section card hindi-text">
            <h2>लक्ष्य (Mission)</h2>
            <p>
              हमारा लक्ष्य शिक्षा का लोकीकरण करना है। हम समाज के अंतिम छोर पर खड़े उस विद्यार्थी तक 
              श्रेष्ठ शिक्षण सामग्री पहुँचाने के लिए प्रतिबद्ध हैं, जिसके पास प्रतिभा तो है किंतु संसाधनों का 
              अभाव है। हम ज्ञान के माध्यम से स्वावलंबन का मार्ग प्रशस्त कर रहे हैं।
            </p>
          </div>

          <div class="about-section card hindi-text">
            <h2>संकल्प (Vision)</h2>
            <p>
              हम एक ऐसे प्रबुद्ध समाज की कल्पना करते हैं जहाँ विद्या पर किसी का एकाधिकार न हो। हमारा 
              स्वप्न है कि दरिद्रता किसी भी बालक की वैचारिक उन्नति को न रोक सके और प्रत्येक छात्र 
              अपने भविष्य का निर्माता स्वयं बने।
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  background: var(--light-color);
}

.about-header {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 48px;
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.founder-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid var(--primary-color);
}

.founder-info h1 {
  font-size: 32px;
  color: var(--dark-color);
  margin-bottom: 8px;
}

.founder-info p {
  margin-bottom: 8px;
  color: var(--text-color);
}

.qualification {
  font-weight: 600;
  color: var(--primary-color);
}

.degrees {
  font-size: 14px;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about-section h2 {
  color: var(--primary-color);
  font-size: 24px;
  margin-bottom: 16px;
}

.about-section p {
  line-height: 1.8;
  text-align: justify;
}

.divider {
  height: 2px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  margin: 24px 0;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .about-header {
    flex-direction: column;
    text-align: center;
  }

  .founder-photo {
    width: 150px;
    height: 150px;
  }

  .founder-info h1 {
    font-size: 24px;
  }
}
</style>
