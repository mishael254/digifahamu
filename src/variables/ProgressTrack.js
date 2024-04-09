import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Col,
  } from "reactstrap";
import Skeleton from 'react-loading-skeleton';
import Api from 'views/dataviews/reduximplementation/Api';

// Other necessary imports
const {members, feedbacks, deployments, messages, projects,statLogs, isLoading,playlists } = Api();
const ProgressTrack = () => {
    

  // Count occurrences of each messageUuid
  const messageCounts = statLogs.reduce((counts, log) => {
    counts[log.messageuuid] = (counts[log.messageuuid] || 0) + 1;
    return counts;
  }, {});

  // Find the most recurring messageUuid
  const mostRecurringMessageUuid = Object.keys(messageCounts).reduce(
    (a, b) => (messageCounts[a] > messageCounts[b] ? a : b),
    null
  );

  // Find the corresponding project information
  const projectInfo = mostRecurringMessageUuid
    ? messages.find((message) => message.messageUuid === mostRecurringMessageUuid)
    : null;

  // Display the project name and theme if projectInfo is found
  const projectName = projectInfo ? projectInfo.playlist.deployment.project.projectname : 'no name ';
  const themeUrl = projectInfo ? projectInfo.playlist.deployment.project.theme : 'no image';

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
              {/* Map over your data to generate progress bars dynamically */}
              {messages.map((message, index) => (
                <li className="px-0 list-group-item" key={index}>
                  <div className="align-items-center row">
                    <div className="col-auto col">
                      <img alt="Project Theme" src={themeUrl} />
                    </div>
                    <div className="col">
                      <h5>{projectName}</h5>
                      {/* Replace progress bar with project progress information */}
                      {/* For example, you can use a progress bar component here */}
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
