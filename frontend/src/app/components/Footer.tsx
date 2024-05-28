import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import styles from "@/app/styles/footer.module.scss"

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div>
              <h3 className={styles.footerHeading}>About Us</h3>
              <ul className={styles.footerList}>
                <li>
                  <a href="/about" className={styles.footerLink}>About Elegance Air</a>
                </li>
                <li>
                  <a href="/careers" className={styles.footerLink}>Careers</a>
                </li>
                <li>
                  <a href="/corporate_info" className={styles.footerLink}>Corporate Information</a>
                </li>
                <li>
                  <a href="/press" className={styles.footerLink}>Press</a>
                </li>
                <li>
                  <a href="/cargo" className={styles.footerLink}>Cargo</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={styles.footerHeading}>Follow Us</h3>
              <ul className={styles.socialLinks}>
                <li>
                  <a href="#" className={styles.socialIcon}>
                    <FaFacebookF style={{ color: "#3b5998", fontSize: "24px" }} />
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.socialIcon}>
                    <FaTwitter style={{ color: "#1da1f2", fontSize: "24px" }} />
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.socialIcon}>
                    <FaInstagram style={{ color: "#c32aa3", fontSize: "24px" }} />
                  </a>
                </li>
                {/* Add more social media icons as needed */}
              </ul>
            </div>
          </div>
          {/* Add more columns as needed */}
        </div>
        <hr className={styles.divider} />
        <div className="row">
          <div className="col-md-6">
            <h3 className={styles.footerHeading}>Contact Us</h3>
            <p className={styles.footerText}>
              <strong>Address:</strong> 123 Example Street, City, Country
            </p>
            <p className={styles.footerText}>
              <strong>Email:</strong> info@eleganceair.com
            </p>
            <p className={styles.footerText}>
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
