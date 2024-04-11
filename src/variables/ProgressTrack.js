import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Col,
} from "reactstrap";
import Skeleton from 'react-loading-skeleton';
import Api from 'views/dataviews/reduximplementation/Api';

const ProgressTrack = () => {

    const { statLogs, isLoading, messages } = Api();

    // Count occurrences of each messageUuid
    const messageCounts = statLogs.reduce((counts, log) => {
        counts[log.messageuuid] = (counts[log.messageuuid] || 0) + 1;
        return counts;
    }, {});

    // Filter messages that occur more than once
    const recurringMessages = Object.keys(messageCounts)
        .filter(messageUuid => messageCounts[messageUuid] > 1);

    // Find the corresponding project information for recurring messages
    const projectInfo = recurringMessages.map(messageUuid => {
        const message = messages.find(message => message.messageuuid === messageUuid);
        const count = messageCounts[messageUuid];
        return { ...message, count };
    });
    
    // Display project name and theme for each recurring message object
    projectInfo.forEach(project => {
        console.log(`Project Name: ${project.playlist.deployment.project.projectName}`);
        console.log("message title::",project.messagetitle);
        console.log(`message Count: ${project.count} times`);
        console.log(`Theme URL: ${project.playlist.deployment.project.theme}`);
        
        
    });

    return (
        <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Progress track</h3>
                </CardHeader>
                <CardBody>
                    {/* Render skeleton loading if data is loading */}
                    {isLoading ? (
                        <Skeleton height={100} count={4} />
                    ) : (
                        <ul className="list my--3 list-group list-group-flush">
                            {/* Map over projectInfo to generate progress bars dynamically */}
                            {projectInfo.map((project, index) => (
                                <li className="px-0 list-group-item" key={index}>
                                    <div className="align-items-center row">
                                        <div className="col-auto col">
                                            <a className="avatar rounded-circle" href="#pablo">
                                                <img alt="Project Theme" src={project.playlist.deployment.project.theme} />
                                            </a>
                                        </div>
                                        <div className="col">
                                            <h5>{project.playlist.deployment.project.projectName}</h5>
                                            <div className="progress-xs mb-0 progress">
                                                {/* Replace progress bar with project progress information */}
                                                <div className="progress-bar bg-orange"
                                                    role="progressbar"
                                                    aria-valuenow="60"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{ width: '60%' }}
                                                >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardBody>
            </Card>
        </Col>
    );
};

export default ProgressTrack;
