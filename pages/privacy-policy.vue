<script>

</script>
<template>
  <section class="section-privacy">
    <div class="privacy-policy">
      <div v-once class="break-line top">
        <p class="break-line-text">PRIVACY POLICY</p>

        <div class="btn-big prv">
          <a href="/" class="btn-big-link">
            <p class="btn-big-p"> BACK HOME</p>
          </a>
        </div>
      </div>

      <div class="main-text">

        <h1>Privacy Policy</h1>
        <p>This privacy policy outlines how we collect, use, and share personal information when you visit or interact
          with our website. We take your privacy seriously and strive to protect your personal data in accordance with
          applicable data protection laws.</p>

        <h2>Information We Collect</h2>
        <p>When you visit our website, we may automatically collect certain information about your device, including
          information about your web browser, IP address, time zone, and some of the cookies installed on your device.
          Additionally, we collect information about the individual web pages or products you view, which websites or
          search terms referred you to our site, and information about how you interact with our website. We refer to
          this automatically collected information as "Device Information."</p>
        <br />
        <p>We collect Device Information using the following technologies:</p>

        <ul>
          <li>"Cookies" are data files placed on your device or computer that often include an anonymous unique
            identifier. For more information about cookies and how to disable them, visit this page.</li>
          <li>"Log files" track actions occurring on the website and collect data including your IP address, browser
            type, internet service provider, referring/exit pages, and date/time stamps.</li>
          <li>"Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse
            the website.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect, including personal information, that we collect about you for the
          following purposes:</p>

        <ul>
          <li>To communicate with you;</li>
          <li>To analyze and improve our website;</li>
          <li>To display relevant content and advertisements;</li>
          <li>To prevent and detect fraud and other illegal activities.</li>
        </ul>

        <h2>Sharing Your Personal Information</h2>
        <p>We share your personal information with third parties to help us achieve the purposes described above. For
          example, with:</p>

        <ul>
          <li>Service providers to assist us with managing our website;</li>
          <li>Advertising networks to deliver relevant ads to you.</li>
        </ul>
        <p>We may also share your information to comply with applicable laws and regulations, to respond to a subpoena,
          search warrant, or other lawful request for information we receive, or to otherwise protect our rights.</p>

        <h2>Data Retention</h2>
        <p>We retain your personal information only for as long as necessary to fulfill the purposes for which we
          collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>

        <h2>Your Rights</h2>
        <p>You have the right to access personal information we hold about you and to ask that your personal information
          be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the
          contact information below.</p>

        <h2>Changes to This Privacy Policy</h2>
        <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our
          practices or for other operational, legal, or regulatory reasons.</p>

        <div class="contact">
          <h2>Contact Us</h2>
          <p>For more information about our privacy practices, if you have questions, or if you would like to make a
            complaint, please contact us by email at <a class="mail"
              href="mailto:info@accurateblack.com?subject=Privacy Policy">info@accurateblack.com</a> </p>

        </div>
      </div>
    </div>
  </section>
</template>

<script>

  </script>

<style scoped lang="scss">


.section-privacy {
  padding: 0 2rem;

}

.prv {
  position: absolute;
  top: 6rem;
  right: 1rem;
}

.privacy-policy {
  color: var(--primary-grey-light2);
  margin: 0 auto;

}

.privacy-policy h1,
.privacy-policy h2 {
  margin-top: 20px;
  color: white;
}

.privacy-policy ul {
  list-style-type: none;
  padding-left: 20px;
}

.privacy-policy ul li {
  margin-bottom: 10px;
}

.contact {
  margin-bottom: 4rem;
}

a {
  text-decoration: none;
  color: var(--primary-grey-light1);
}

.mail {
  &:hover {
    color: white;
  }
}

.main-text {
  margin-top: 6rem;
  padding: 0 2rem;
  border: 1px solid white;

  @include respond(phone) {
    margin-top: 4rem;

  }
}
</style>