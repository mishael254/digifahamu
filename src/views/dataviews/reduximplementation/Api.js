import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMembersAction,
  fetchFeedbacksAction,
  fetchDeploymentsAction,
  fetchStatLogsAction,
  fetchMessagesAction,
  fetchPlaylistsAction,
  fetchProjectsAction,
} from "../../../redux/Actions";
import {
  
  selectMembers,
  selectFeedbacks,
  selectDeployments,
  selectStatLogs,
  selectMessages,
  selectPlaylists,
  selectProjects,
  selectIsLoading,
} from "../../../redux/Reducers";

function Api() {
  const dispatch = useDispatch();
  const members = useSelector(selectMembers);
  console.log(members);
  const feedbacks = useSelector(selectFeedbacks);
  const deployments = useSelector(selectDeployments);
  console.log(deployments);
  const statLogs = useSelector(selectStatLogs);
  console.log(statLogs);
  const messages = useSelector(selectMessages);
  console.log(messages);
  const playlists = useSelector(selectPlaylists);
  console.log(playlists);
  const projects = useSelector(selectProjects);
  console.log(projects);
  const isLoading = useSelector(selectIsLoading);
  console.log(isLoading);
  
  useEffect(() => {
    dispatch(fetchMembersAction());
    dispatch(fetchFeedbacksAction());
    dispatch(fetchDeploymentsAction());
    dispatch(fetchStatLogsAction());
    dispatch(fetchMessagesAction());
    dispatch(fetchPlaylistsAction());
    dispatch(fetchProjectsAction());
  }, [dispatch]);
   // Log the data to the console
   useEffect(() => {
   
    console.log("Members:", members);
    console.log("Feedbacks:", feedbacks);
    console.log("Deployments:", deployments);
    console.log("StatLogs:", statLogs);
    console.log("Messages:", messages);
    console.log("Playlists:", playlists);
    console.log("Projects:", projects);
    console.log("Is Loading:", isLoading);
  }, [members, feedbacks, deployments, statLogs, messages, playlists, projects, isLoading]);

  return { members, feedbacks, deployments, messages, statLogs, playlists, projects, isLoading };
}

export default Api;
