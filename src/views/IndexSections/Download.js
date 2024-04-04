/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";


// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

class Download extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3">
                Empower Yourself with Knowledge{" "}
                  <span className="text-success">
                  Introducing digifahamu for Africa
                  </span>
                </h2>
                <p className="lead">
                In a world filled with challenges, knowledge is the ultimate tool for transformation. 
                Welcome to digifahamu, your gateway to enlightenment and empowerment. 
                Designed specifically for individuals across Africa, our app is here to address common issues and equip you with the insights and resources you need to thrive.
                </p>
                <div className="btn-wrapper">
                  <Button
                    className="mb-3 mb-sm-0"
                    color="primary"
                    href="https://drive.google.com/file/d/12rgrlts6qEmS9ZoXziGPyl-EuJAO8DBx/view?usp=sharing"
                  >
                    Download digifahamu
                  </Button>
                </div>
                <div className="text-center">
                  <h4 className="display-4 mb-5 mt-5">
                    Our partners
                  </h4>
                  <Row className="justify-content-center">
                    <Col lg="2" xs="4">
                      <a
                        href="https://www.creative-tim.com/product/argon-design-system?ref=adsr-landing-page"
                        id="tooltip255035741"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid"
                          src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_UNICEF.svg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip255035741">
                      The United Nations Children's Fund (UNICEF)
                      </UncontrolledTooltip>
                    </Col>
                    <Col lg="2" xs="4">
                      <a
                        href="https://www.creative-tim.com/product/vue-argon-design-system?ref=adsr-landing-page"
                        id="tooltip265846671"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid"
                          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Flag-United-Nations-Logo.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip265846671">
                        The United Nations
                      </UncontrolledTooltip>
                    </Col>
                    <Col lg="2" xs="4">
                      <a
                        href="https://www.creative-tim.com/product/argon-design-system-angular?ref=adsr-landing-page"
                        id="tooltip233150499"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid"
                          src="https://pbs.twimg.com/profile_images/1034730908010602496/9DeckQOF_400x400.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip233150499">
                      Centre for Behaviour Change and Communication (CBCC)
                      </UncontrolledTooltip>
                    </Col>
                    <Col lg="2" xs="4">
                      <a
                        href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                        id="tooltip308866163"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid"
                          src="https://centreforbcc.com/wp-content/uploads/2021/01/CBCC-LOGO-PNG-revised.png"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip308866163">
                      Social and Behaviour Change (SBC) solutions 
                      </UncontrolledTooltip>
                    </Col>
                    <Col lg="2" xs="4">
                      <a
                        href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                        id="tooltip76119384"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid"
                          src="https://i0.wp.com/amref.org/enterprises/wp-content/uploads/sites/3/2018/11/white.png?ssl=1"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip76119384">
                      The African Medical and Research Foundation (AMREF)
                      </UncontrolledTooltip>
                    </Col>
                    <Col lg="2" xs="4">
                      <a
                        href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                        id="tooltip646643508"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid"
                          src="https://nutritionhealth.or.ke/wp-content/uploads/2016/06/KenyaNHPplus.png"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip646643508">
                      The United States Agency for International Development (USAID)
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Download;
