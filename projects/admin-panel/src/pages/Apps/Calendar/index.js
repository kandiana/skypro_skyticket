import React, { Component } from "react";
import SettingMenu from "../../Shared/SettingMenu";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

// Full Calendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapPlugin from "@fullcalendar/bootstrap";
import { Link } from "react-router-dom";

//css
import "@fullcalendar/bootstrap/main.css";
import "@fullcalendar/bootstrap/main.css";

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";

const DefaultEvents = [
  {
    id: 1,
    title: "All Day Event",
    start: new Date().setDate(new Date().getDate() + 1),
    allDay: false,
    className: "bg-primary",
  },
  {
    id: 2,
    title: "Repeating Event",
    start: new Date().setDate(new Date().getDate() - 5),
    allDay: false,
    className: "bg-teal",
  },
  {
    id: 3,
    title: "Meeting",
    start: new Date().setDate(new Date().getDate() - 3),
    allDay: false,
    className: "bg-primary",
  },
  {
    id: 4,
    title: "Meeting",
    start: new Date().setDate(new Date().getDate() + 4),
    allDay: false,
    className: "bg-warning",
  },
  {
    id: 5,
    title: "Meeting",
    start: new Date().setDate(new Date().getDate() + 4),
    allDay: false,
    className: "bg-danger",
  },
];

const DefaultCategories = [
  {
    id: 1,
    title: "New Theme Release",
    type: "bg-success",
  },
  {
    id: 2,
    title: "My Event",
    type: "bg-info",
  },
  {
    id: 3,
    title: "Meet Manager",
    type: "bg-warning",
  },
  {
    id: 4,
    title: "Report Error",
    type: "bg-danger",
  },
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.calendarComponentRef = React.createRef();

    this.state = {
      calendarWeekends: true,
      calendarEvents: DefaultEvents,
      categories: DefaultCategories,
      modal: false,
      modalcategory: false,
      isDragBind: false,
      eventInfo: null,
    };
    this.toggle = this.toggle.bind(this);
    this.togglecategory = this.togglecategory.bind(this);
    this.handleValidEventSubmit = this.handleValidEventSubmit.bind(this);
    this.handleValidEventSubmitcategory = this.handleValidEventSubmitcategory.bind(
      this
    );
    // category
    this.onDrag = this.onDrag.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  componentDidMount = () => {
    new Draggable(document.getElementById("external-events"), {
      itemSelector: ".external-event",
    });
  };
  /**
   * Handling the modal state
   */
  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }
  togglecategory() {
    this.setState((prevState) => ({
      modalcategory: !prevState.modalcategory,
    }));
  }

  /**
   * Handling date click on calendar
   */
  handleDateClick = (arg) => {
    if (this.state.event) {
      const modifiedEvent = this.state.event;
      modifiedEvent.title = "";
      modifiedEvent.category = "bg-primary";

      this.setState({
        event: modifiedEvent,
      });
    }
    this.setState({ selectedDay: arg });

    this.toggle();
  };

  /**
   * Handling click on event on calendar
   */

  handleEventClick = (arg) => {
    const event = arg.event;
    this.setState({
      event: {
        id: event.id,
        title: event.title,
        title_category: event.title_category,
        start: event.start,
        className: event.classNames,
        category: event.classNames[0],
        event_category: event.classNames[0],
      },
      isEdit: true,
      eventInfo : arg
    });
    this.toggle();
  };
  /**
   * Handling submit event on event form
   */
  handleValidEventSubmit = (event, values) => {
    var newEvent = {};

    if (this.state.isEdit) {
      newEvent = {
        id: this.state.event.id,
        title: values.title,
        classNames: values.category + " text-white",
        start: this.state.event.start,
      };
      let filteredArray = this.state.calendarEvents.filter(
        (item) => item.id + "" !== this.state.event.id + ""
      );
      this.setState({ calendarEvents: filteredArray, event: null });
    } else {
      newEvent = {
        id: this.state.calendarEvents.length + 1,
        title: values["title"],
        start: this.state.selectedDay
          ? this.state.selectedDay.date
          : new Date(),
        className: values.category + " text-white",
      };
    }

    // save new event
    this.setState({
      calendarEvents: this.state.calendarEvents.concat(newEvent),
      selectedDay: null,
    });

    this.toggle();
  };
  handleValidEventSubmitcategory = (event, values) => {
    var newEvent = {};

    newEvent = {
      id: this.state.calendarEvents.length + 1,
      title: values["title_category"],
      type: values.event_category,
    };
    this.state.categories.concat(newEvent);
    this.setState({
      categories: this.state.categories.concat(newEvent),
    });
    console.log(this.state.categories);

    this.togglecategory();
  };
  /**
   * On category darg event
   */
  onDrag = (event, category) => {
    event.preventDefault();
  };

  /**
   * On calendar drop event
   */
  onDrop = (event) => {
    const draggedEl = event.draggedEl;

    var newEvent = {
      id: this.state.calendarEvents.length + 1,
      title: draggedEl.innerText,
      start: event.date,
      className: draggedEl.getAttribute("data-type") + " text-white",
    };

    // save new event
    this.setState({
      calendarEvents: this.state.calendarEvents.concat(newEvent),
    });
  };

  deleteEvent = () => {
    this.state.eventInfo.event.remove();
    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        {/* <div className="page-content"> */}
        <Container fluid={true}>
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Calendar</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Veltrix</Link>
                  </li>
                  <li className="breadcrumb-item active">Calendar</li>
                </ol>
              </div>
            </Col>
            <Col sm={6}>
              <div className="float-right d-none d-md-block">
                <SettingMenu />
              </div>
            </Col>
          </Row>

          <Row>
            <div className="col-12">
              <Row>
                <Col lg={3}>
                  <Card>
                    <CardBody>
                      <Button
                        color="primary"
                        className="font-16 btn-block"
                        onClick={this.togglecategory}
                      >
                        <i className="mdi mdi-plus-circle-outline"></i> Create
                        New Event
                      </Button>

                      <div id="external-events" className="mt-3">
                        <p className="text-muted">
                          Drag and drop your event or click in the calendar
                        </p>

                        {this.state.categories.map((category, i) => {
                          return (
                            <div
                              className={`external-event ${category.type} text-white p-1 mb-1`}
                              key={("cat-" + category.id, i)}
                              draggable
                              onDrag={(event) => this.onDrag(event, category)}
                              data-type={category.type}
                            >
                              <i className="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>{" "}
                              {category.title}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-5">
                        <h4 className="card-title mb-3">Activity</h4>

                        <ol className="activity-feed mb-0 pl-2 ml-1">
                          <li className="feed-item">
                            <p className="mb-0">
                              Andrei Coman magna sed porta finibus, risus posted
                              a new article: Forget UX Rowland
                            </p>
                          </li>
                          <li className="feed-item">
                            <p className="mb-0">
                              Zack Wetass, sed porta finibus, risus Chris
                              Wallace Commented Developer Moreno
                            </p>
                          </li>
                          <li className="feed-item">
                            <p className="mb-0">
                              Zack Wetass, Chris combined Commented UX Murphy
                            </p>
                          </li>
                        </ol>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={9}>
                  <Card>
                    <CardBody>
                      {/* fullcalendar control */}
                      <FullCalendar
                        ref={this.calendarComponentRef}
                        defaultView="dayGridMonth"
                        plugins={[
                          BootstrapPlugin,
                          dayGridPlugin,
                          interactionPlugin,
                        ]}
                        slotDuration={"00:15:00"}
                        minTime={"08:00:00"}
                        maxTime={"19:00:00"}
                        handleWindowResize={true}
                        themeSystem="bootstrap"
                        header={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,dayGridWeek,dayGridDay",
                        }}
                        events={this.state.calendarEvents}
                        editable={true}
                        droppable={true}
                        eventLimit={true}
                        selectable={true}
                        dateClick={this.handleDateClick}
                        eventClick={this.handleEventClick}
                        drop={this.onDrop}
                        id="calendar"
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <div style={{ clear: "both" }}></div>

              {/* New/Edit event modal */}
              <Modal
                isOpen={this.state.modal}
                // toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle} tag="h4">
                  Add Event
                </ModalHeader>
                <ModalBody>
                  <AvForm onValidSubmit={this.handleValidEventSubmit}>
                    <Row form>
                      <Col className="col-12">
                        <AvField
                          name="title"
                          label="Event Name"
                          type="text"
                          errorMessage="Invalid name"
                          validate={{
                            required: { value: true },
                          }}
                          value={this.state.event ? this.state.event.title : ""}
                        />
                      </Col>
                      <Col className="col-12">
                        <AvField
                          type="select"
                          name="category"
                          label="Select Category"
                          value={
                            this.state.event
                              ? this.state.event.category
                              : "bg-primary"
                          }
                        >
                          <option value="bg-danger">Danger</option>
                          <option value="bg-success">Success</option>
                          <option value="bg-primary">Primary</option>
                          <option value="bg-info">Info</option>
                          <option value="bg-dark">Dark</option>
                          <option value="bg-warning">Warning</option>
                        </AvField>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-danger"
                          id="btn-delete-event"
                          onClick={() => this.deleteEvent()}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="col-6 text-right">
                        <button
                          type="button"
                          className="btn btn-light mr-1"
                          onClick={this.toggle}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="btn-save-event"
                        >
                          Save
                        </button>
                      </div>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>

              {/* <Modal
                  isOpen={this.state.modalcategory}
                  toggle={this.togglecategory}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.togglecategory} tag="h4">
                    Add a category
                  </ModalHeader>
                  <ModalBody>
                    <AvForm onValidSubmit={this.handleValidEventSubmitcategory}>
                      <Row form>
                        <Col className="col-12">
                          <AvField
                            name="title_category"
                            label="Category Name"
                            type="text"
                            errorMessage="Invalid name"
                            validate={{
                              required: { value: true },
                            }}
                            value={
                              this.state.title_category
                                ? this.state.event.title_category
                                : ""
                            }
                          />
                        </Col>
                        <Col className="col-12">
                          <AvField
                            type="select"
                            name="event_category"
                            label="Choose Category Color"
                            value={
                              this.state.event
                                ? this.state.event.event_category
                                : "bg-primary"
                            }
                          >
                            <option value="bg-danger">Danger</option>
                            <option value="bg-success">Success</option>
                            <option value="bg-primary">Primary</option>
                            <option value="bg-info">Info</option>
                            <option value="bg-dark">Dark</option>
                            <option value="bg-warning">Warning</option>
                          </AvField>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="text-right">
                            <button
                              type="button"
                              className="btn btn-light mr-2"
                              onClick={this.togglecategory}
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success save-event"
                            >
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </AvForm>
                  </ModalBody>
                </Modal> */}
            </div>
          </Row>
        </Container>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Calendar;
