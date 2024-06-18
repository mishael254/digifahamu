import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    Row,
    Table,
} from "reactstrap";
import Skeleton from 'react-loading-skeleton';
import Api from 'views/dataviews/reduximplementation/Api';

const ActivityFeedTab = () => {
    const {statLogs, messages, feedbacks, playlists, isLoading} = Api();

    // Function to count unique phone numbers in statlogs based on messageUuid
    const countUniquePhones = (messageuuid) => {
        const filteredStatlogs = statLogs.filter(log => log.messageuuid === messageuuid);
        const uniquePhones = new Set(filteredStatlogs.map(log => log.phone));
        return uniquePhones.size;
    };

    // Function to count unique phones in feedbacks based on messageUuid
    const countUniqueFeedbackPhones = (messageuuid) => {
        const filteredFeedbacks = feedbacks.filter(feedback => feedback.messageuuid === messageuuid);
        const uniquePhones = new Set(filteredFeedbacks.map(feedback => feedback.phone));
        return uniquePhones.size;
    };

    return (
        <div>
            {playlists.map((playlist, index) => (
                <Col key={index} className="mb-5 mb-xl-0" xl="5">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Activity feed</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="d-flex align-items-center card-header">
                            <div className="d-flex align-items-center">
                                <a href="#pablo">
                                    <img alt="..." className="img-fluid rounded" src={playlist.deployment.thumbnail}/>
                                </a>
                                <div className="mx-3">
                                    <a className="text-dark font-weight-600 text-sm" href="#pablo">{playlist.title}</a>
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
                            <p className="mb-4">{playlist.title}</p><hr/>  
                            {/* Render messages related to this playlist */}
                            {messages.map((message, index) => {
                                if (message.playlist.id === playlist.id) {
                                    return (
                                        <React.Fragment key={index}>
                                            <p className="mb-4">{message.messageTitle} </p><hr/>
                                            <p className="mb-4"> {message.messagedescription}</p>
                                            <img alt="..." className="img-fluid rounded" src={message.messagefile}/>
                                            <div className="align-items-center my-3 pb-3 border-bottom row">
                                            <div className="col-sm-6">
                                            <div className="icon-actions">
                                            <a className="like active" href="#pablo">
                                            <i className="ni ni-like-2"></i>
                                                {/* Count unique phones in statlogs */}
                                                <span className="text-muted">{countUniquePhones(message.messageuuid)}</span>
                                                </a>
                                                <a href="#pablo">
                                                <i className="ni ni-chat-round"></i>
                                                {/* Count unique phones in feedbacks */}
                                                <span className="text-muted">{countUniqueFeedbackPhones(message.messageuuid)}</span>
                                                </a>
                                                <a href="#pablo">
                                                <i className="ni ni-curved-next"></i>
                                                <span className="text-muted">12</span>
                                                </a>
                                                </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                }
                            })}
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
                                {/* Render remaining messages in playlist */}
                            {messages.filter(message => message.playlist.id === playlist.id).length > 3 && (
                                <small className="pl-2 font-weight-bold">
                                    and {messages.filter(message => message.playlist.id === playlist.id).length - 3} more
                                </small>
                            )}
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
                        
                            
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </div>
    );
};

export default ActivityFeedTab;
