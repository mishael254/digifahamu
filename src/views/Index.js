import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Badge,
  CardFooter,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Media,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
//message data imports
import MessagePopularity from "variables/MessagePopularity";

import Header from "components/Headers/Header.js";
import Api from "./dataviews/reduximplementation/Api";
const Index = ({statlogs}) => {
  const [activeNav, setActiveNav] = useState('monthly');
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const {members, feedbacks, deployments, messages, projects,statLogs, isLoading,playlists } = Api();

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, interval) => {
    e.preventDefault();
    setActiveNav(interval);
    
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Message Populality
                    </h6>
                    <h2 className="text-white mb-0">over Time</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 'monthly',
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 'monthly')}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 'weekly',
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 'weekly')}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                <MessagePopularity statLogs={statLogs} activeInterval={activeNav} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Message Play Duration Distribution
                    </h6>
                    <h2 className="mb-0">Total Play distribution</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

 




        {/**formated additional content */}

        <Row className="mt-5">
  <Col className="mb-5 mb-xl-0" xl="4">
    <Card className="shadow">
      <CardHeader className="border-0">
        <h3 className="mb-0">Team members</h3>
      </CardHeader>
      <CardBody>
        {/* Paste the provided Team members card content here */}
                  
                          <ul className="list my--3 list-group list-group-flush">
                            <li className="px-0 list-group-item">
                            <div className="align-items-center row">
                            <div className="col-auto col">
                              <a className="avatar rounded-circle" href="#pablo">
                                <img alt="..." src={require("../assets/img/theme/BADILISHA-01.jpg")}/>
                              </a>
                            </div>
                            <div className="col ml--2">
                              <h4 className="mb-0">
                                <a href="#pablo">John Michael</a>
                              </h4>
                              <span className="text-success">●</span>
                                <small>Online</small>
                            </div>
                            <div className="col-auto col">
                              <button type="button" className="btn btn-primary btn-sm">Add</button>
                            </div>
                          </div>
                        </li>
                        <li className="px-0 list-group-item">
                        <div className="align-items-center row">
                        <div className="col-auto col">
                          <a className="avatar rounded-circle" href="#pablo">
                            <img alt="..." src={require("../assets/img/theme/digiredio.jpg")}/>
                          </a>
                        </div>
                        <div className="col ml--2">
                          <h4 className="mb-0">
                            <a href="#pablo">Alex Smith</a>
                          </h4>
                          <span className="text-warning">●</span>
                          <small>In a meeting</small>
                        </div>
                        <div className="col-auto col">
                          <button type="button" className="btn btn-primary btn-sm">Add</button>
                        </div>
                      </div>
                    </li>
                    <li className="px-0 list-group-item">
                      <div className="align-items-center row">
                      <div className="col-auto col">
                      <a class="avatar rounded-circle" href="#pablo">
                        <img alt="..." src={require("../assets/img/theme/digisinema.jpg")}/>
                      </a>
                      </div>
                      <div className="col ml--2">
                        <h4 class="mb-0">
                          <a href="#pablo">Samantha Ivy</a>
                        </h4>
                        <span className="text-danger">●</span>
                        <small>Offline</small>
                      </div>
                      <div className="col-auto col">
                        <button type="button" className="btn btn-primary btn-sm">Add</button>
                      </div>
                    </div>
                  </li>
                  <li className="px-0 list-group-item">
                    <div className="align-items-center row">
                      <div className="col-auto col">
                        <a className="avatar rounded-circle" href="#pablo"><img alt="..." src={require("../assets/img/theme/badili.jpg")}/></a>
                      </div>
                    <div className="col ml--2">
                      <h4 className="mb-0">
                        <a href="#pablo">John Michael</a>
                      </h4>
                      <span class="text-success">●</span>
                      <small>Online</small>
                    </div>
                  <div className="col-auto col">
                    <button type="button" className="btn btn-primary btn-sm">Add</button>
                  </div>
                </div>
              </li>
            </ul>
          
      </CardBody>
    </Card>
  </Col>
  <Col className="mb-5 mb-xl-0" xl="4">
    <Card className="shadow">
      <CardHeader className="border-0">
        <h3 className="mb-0">To do list</h3>
      </CardHeader>
      <CardBody>
        {/* Paste the provided To do list card content here */}
             
            <ul data-toggle="checklist" className="list-group list-group-flush">
              <li className="checklist-entry flex-column align-items-start py-4 px-4 list-group-item">
                <div className="checklist-item checklist-item-success checklist-item-checked">
                  <div className="checklist-info">
                    <h5 className="checklist-title mb-0">Call with Dave</h5>
                    <small>10:30 AM</small>
                  </div>
                <div>
                  <div className="custom-control custom-checkbox custom-checkbox-success">
                    <input className="custom-control-input" id="chk-todo-task-1" type="checkbox" checked=""/>
                      <label className="custom-control-label" for="chk-todo-task-1"></label>
                  </div>
                </div>
                </div>
              </li>
              <li className="checklist-entry flex-column align-items-start py-4 px-4 list-group-item">
                <div className="checklist-item checklist-item-warning">
                  <div className="checklist-info">
                    <h5 className="checklist-title mb-0">Lunch meeting</h5>
                    <small>10:30 AM</small>
                  </div>
                  <div>
                  <div className="custom-control custom-checkbox custom-checkbox-warning">
                    <input class="custom-control-input" id="chk-todo-task-2" type="checkbox"/>
                    <label className="custom-control-label" for="chk-todo-task-2"></label>
                  </div>
                </div>
                </div>
              </li>
              <li className="checklist-entry flex-column align-items-start py-4 px-4 list-group-item">
                  <div className="checklist-item checklist-item-info">
                    <div className="checklist-info">
                      <h5 className="checklist-title mb-0">Argon Dashboard Launch</h5>
                        <small>10:30 AM</small>
                    </div>
                  <div>
                  <div className="custom-control custom-checkbox custom-checkbox-info">
                    <input className="custom-control-input" id="chk-todo-task-3" type="checkbox"/>
                      <label className="custom-control-label" for="chk-todo-task-3"></label>
                  </div>
                </div>
                </div>
            </li>
            <li className="checklist-entry flex-column align-items-start py-4 px-4 list-group-item">
              <div className="checklist-item checklist-item-danger checklist-item-checked">
                <div className="checklist-info">
                  <h5 className="checklist-title mb-0">Winter Hackaton</h5>
                  <small>10:30 AM</small>
                </div>
                <div>
                  <div className="custom-control custom-checkbox custom-checkbox-danger">
                    <input className="custom-control-input" id="chk-todo-task-4" type="checkbox" checked=""/>
                    <label className="custom-control-label" for="chk-todo-task-4"></label>
                  </div>
                </div>
                </div>
              </li>
            </ul>
          
      </CardBody>
    </Card>
  </Col>
  <Col className="mb-5 mb-xl-0" xl="4">
    <Card className="shadow">
      <CardHeader className="border-0">
        <h3 className="mb-0">Progress track</h3>
      </CardHeader>
      <CardBody>
        {/* Paste the provided Progress track card content here */}
        
      <ul className="list my--3 list-group list-group-flush">
        <li className="px-0 list-group-item">
          <div className="align-items-center row">
            <div className="col-auto col">
              <a className="avatar rounded-circle" href="#pablo">
                <img alt="..." src={require("../assets/img/theme/badilisha.jpg")}/>
              </a>
            </div>
            <div className="col">
              <h5>Argon Design System</h5>
              <div className="progress-xs mb-0 progress">
                <div className="progress-bar bg-orange" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60%'}}>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="px-0 list-group-item">
          <div className="align-items-center row">
            <div className="col-auto col">
              <a className="avatar rounded-circle" href="#pablo">
                <img alt="..." src={require("../assets/img/theme/bootstrap.jpg")}/>
              </a>
            </div>
            <div className="col">
              <h5>Angular Now UI Kit PRO</h5>
              <div className="progress-xs mb-0 progress">
                <div className="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="px-0 list-group-item">
          <div className="align-items-center row">
            <div className="col-auto col">
              <a className="avatar rounded-circle" href="#pablo">
                <img alt="..." src={require("../assets/img/theme/digisinema.jpg")}/>
              </a>
            </div>
          <div className="col">
            <h5>Black Dashboard</h5>
            <div className="progress-xs mb-0 progress">
              <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" style={{width: '72%'}}>
              </div>
            </div>
          </div>
          </div>
        </li>
        <li className="px-0 list-group-item">
          <div className="align-items-center row">
            <div className="col-auto col">
              <a className="avatar rounded-circle" href="#pablo">
                <img alt="..." src={require("../assets/img/theme/badili.jpg")}/>
              </a>
            </div>
          <div className="col">
            <h5>React Material Dashboard</h5>
            <div className="progress-xs mb-0 progress">
              <div className="progress-bar bg-info" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{width: '90%'}}>
              </div>
            </div>
          </div>
          </div>
        </li>
      </ul>
      
      </CardBody>
    </Card>
  </Col>
</Row>

        {/**end of formated additional content */}


        {/**start of another test1 content */}
        <Row className="mt-5">
  <Col className="mb-5 mb-xl-0" xl="5">
    <Card className="shadow">
      <CardHeader className="border-0">
        <h3 className="mb-0">Activity feed</h3>
      </CardHeader>
      <CardBody>
        <div className="d-flex align-items-center card-header">
          <div className="d-flex align-items-center">
            <a href="#pablo">
              <img alt="..." className="avatar" src={require("../assets/img/theme/angular.jpg")}/>
            </a>
            <div className="mx-3">
              <a className="text-dark font-weight-600 text-sm" href="#pablo">John Snow</a>
              <small className="d-block text-muted">3 days ago</small>
            </div>
          </div>
          <div className="text-right ml-auto">
            <button type="button" className="btn-icon btn btn-primary btn-sm">
              <span className="btn-inner--icon mr-1">
                <i className="ni ni-fat-add"></i>
              </span>
              <span className="btn-inner--text">Follow</span>
            </button>
          </div>
        </div>
        <div className="card-body">
          <p className="mb-4">Personal profiles are the perfect way for you to grab their attention and persuade recruiters to continue reading your CV because you’re telling them from the off exactly why they should hire you.</p>
          <img alt="..." className="img-fluid rounded" src={require("../assets/img/theme/textme.jpg")}/>
          <div className="align-items-center my-3 pb-3 border-bottom row">
            <div className="col-sm-6">
              <div className="icon-actions">
                <a className="like active" href="#pablo">
                  <i className="ni ni-like-2"></i>
                  <span className="text-muted">150</span>
                </a>
                <a href="#pablo">
                  <i className="ni ni-chat-round"></i>
                  <span className="text-muted">36</span>
                </a>
                <a href="#pablo">
                  <i className="ni ni-curved-next"></i>
                  <span className="text-muted">12</span>
                </a>
              </div>
            </div>
            <div className="d-none d-sm-block col-sm-6">
              <div className="d-flex align-items-center justify-content-sm-end">
                <div className="avatar-group">
                  <a className="avatar avatar-xs rounded-circle" href="#pablo" id="tooltip36177092">
                    <img alt="..." src={require("../assets/img/theme/digiredio.jpg")}/>
                  </a>
                  <a className="avatar avatar-xs rounded-circle" href="#pablo" id="tooltip857639221">
                    <img alt="..." className="rounded-circle" src={require("../assets/img/theme/digiredio.jpg")}/>
                  </a>
                  <a className="avatar avatar-xs rounded-circle" href="#pablo" id="tooltip260223080">
                    <img alt="..." className="rounded-circle" src={require("../assets/img/theme/cbcc.jpg")}/>
                  </a>
                </div>
                <small className="pl-2 font-weight-bold">and 30+ more</small>
              </div>
            </div>
          </div>
          <div className="mb-1">
            <div className="media-comment media">
              <img alt="..." className="avatar avatar-lg media-comment-avatar rounded-circle"  src={require("../assets/img/theme/img-1-1200x1000.jpg")}/>
              <div className="media">
                <div className="media-comment-text">
                  <h6 className="h5 mt-0">Michael Lewis</h6>
                  <p className="text-sm lh-160">Cras sit amet nibh libero nulla vel metus scelerisque ante sollicitudin. Cras purus odio vestibulum in vulputate viverra turpis.</p>
                  <div className="icon-actions">
                    <a className="like active" href="#pablo">
                      <i className="ni ni-like-2"></i>
                      <span className="text-muted">3 likes</span>
                    </a>
                    <a href="#pablo">
                      <i className="ni ni-curved-next"></i>
                      <span className="text-muted">2 shares</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="media-comment media">
              <img alt="..." className="avatar avatar-lg media-comment-avatar rounded-circle"  src={require("../assets/img/theme/img-2-1200x1000.jpg")}/>
              <div className="media">
                <div className="media-comment-text">
                  <h6 className="h5 mt-0">Jessica Stones</h6>
                  <p className="text-sm lh-160">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                  <div className="icon-actions">
                    <a className="like active" href="#pablo">
                      <i className="ni ni-like-2"></i>
                      <span className="text-muted">10 likes</span>
                    </a>
                    <a href="#pablo">
                      <i className="ni ni-curved-next"></i>
                      <span className="text-muted">1 share</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <hr/>
            <div className="align-items-center media">
              <img alt="..." className="avatar avatar-lg rounded-circle mr-4"  src={require("../assets/img/theme/digisinema.jpg")}/>
              <div className="media-body">
                <form className="">
                  <textarea placeholder="Write your comment" rows="1" className="form-control"></textarea>
                </form>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  </Col>
  <Col className="mb-5 mb-xl-0" xl="7">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Card tables</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Status</th>
                    <th scope="col">Users</th>
                    <th scope="col">Completion</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Argon Design System
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$2,500 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip742438047"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip941738690"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip941738690"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip804044742"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip804044742"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip996637554"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip996637554"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-danger"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Angular Now UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$1,800 USD</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        completed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip746418347"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip746418347"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip102182364"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip102182364"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip406489510"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip406489510"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip476840018"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip476840018"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">100%</span>
                        <div>
                          <Progress
                            max="100"
                            value="100"
                            barClassName="bg-success"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">Black Dashboard</span>
                        </Media>
                      </Media>
                    </th>
                    <td>$3,150 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        delayed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip753056318"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip753056318"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip441753266"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip441753266"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip188462246"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip188462246"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip621168444"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip621168444"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">72%</span>
                        <div>
                          <Progress
                            max="100"
                            value="72"
                            barClassName="bg-danger"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("../assets/img/theme/BADILISHA-01.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            React Material Dashboard
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$4,400 USD</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        on schedule
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip875258217"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/BADILISHA-01.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip875258217"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip834416663"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/BADILISHA-01.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip834416663"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip372449339"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/BADILISHA-01.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip372449339"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip108714769"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/BADILISHA-01.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip108714769"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">90%</span>
                        <div>
                          <Progress
                            max="100"
                            value="90"
                            barClassName="bg-info"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("../assets/img/theme/BADILISHA-01.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Vue Paper UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$2,200 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        completed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip664029969"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/BADILISHA-01.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip664029969"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip806693074"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip806693074"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip844096937"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip844096937"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip757459971"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/digisinema.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip757459971"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">100%</span>
                        <div>
                          <Progress
                            max="100"
                            value="100"
                            barClassName="bg-success"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </Col>
</Row>
                                
                                
        {/**end of the test1 content */}

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
