import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import HowWeHelp from "./components/HowWeHelp";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Reviews from "./components/Reviews";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
      isLoading: true, // Состояние загрузки
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data, isLoading: false }); // Устанавливаем состояние загрузки в false
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
        this.setState({ isLoading: false }); // Обязательно устанавливаем состояние загрузки в false даже в случае ошибки
      }.bind(this)
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    const { isLoading, resumeData } = this.state;

    if (isLoading) {
      return <p>Загрузка...</p>; // Показываем индикатор загрузки
    }

    return (
      <div className="App">
        <Header data={resumeData.main} />
        <About data={resumeData.main} />
        <HowWeHelp data={resumeData.howwehelp} />
        <Gallery data={resumeData.gallery} />
        <Reviews data={resumeData.reviews} />
        <Contact data={resumeData.main} />
        <Footer data={resumeData.main} />
      </div>
    );
  }
}

export default App;
