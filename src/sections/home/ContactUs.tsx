import { Card, Row, Col } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

function ContactUs() {
  return (
    <section
      id="contactus"
      style={{ marginBottom: 0, minHeight: "100vh", paddingBottom: 0 }}
    >
      <div className="trending-heading">
        <h2>Contact Us</h2>
      </div>
      <Row
        justify="center"
        gutter={50}
        style={{ marginRight: "3vw", marginTop: "3vh" }}
      >
        <Col lg={8}>
          <Card
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#121435",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <PhoneOutlined
              style={{ fontSize: "3rem", marginBottom: "20px", color: "white" }}
            />
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "10px",
                color: "white",
              }}
            >
              Call Us on
            </h3>
            <p style={{ fontSize: "1.2rem", color: "white" }}>
              +91 63603 18731
            </p>
          </Card>
        </Col>

        <Col lg={8}>
          <Card
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#121435",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <MailOutlined
              style={{ fontSize: "3rem", marginBottom: "20px", color: "white" }}
            />
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "10px",
                color: "white",
              }}
            >
              Email Us on
            </h3>
            <p style={{ fontSize: "1.2rem", color: "white" }}>Tour@gmail.com</p>
          </Card>
        </Col>

        <Col lg={8}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4382763336616!2d77.54282187572221!3d12.879515516889208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3ff6a45723e1%3A0x69778adf4245cc6e!2sK.s%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1710693772422!5m2!1sen!2sin"
            width="500"
            height="500"
            style={{ border: "0" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
      </Row>
    </section>
  );
}

export default ContactUs;
