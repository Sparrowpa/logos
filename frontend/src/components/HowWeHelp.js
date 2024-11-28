import React, { Component } from "react";
import Slide from "react-reveal";

class HowWeHelp extends Component {
  render() {
    if (!this.props.data) return null;

    const { introduction, services } = this.props.data;

    return (
      <section id="howwehelp">
        <Slide left duration={1300}>
          <div className="row">
            <div className="nine columns main-col">
              <p>{introduction}</p>
            </div>
          </div>
        </Slide>

        <Slide left duration={1300}>
          <div className="row services">
            <div className="services">
              {services.map((service, index) => (
                <div key={index} className="service-item">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Slide>
      </section>
    );
  }
}

export default HowWeHelp;
