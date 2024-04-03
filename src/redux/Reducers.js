import { createSlice } from '@reduxjs/toolkit';
//import * as types from './Types';
import { fetchMembersAction,fetchDeploymentsAction,fetchFeedbacksAction,fetchMessagesAction,fetchPlaylistsAction,fetchProjectsAction,fetchStatLogsAction } from './Actions';  // Import fetchMembersAction
const initialState = {
  members: [],
  feedbacks: [],
  deployments: [],
  statLogs: [],
  messages: [],
  playlists: [],
  projects: [],
  isLoading: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  
  extraReducers: (builder) => {
    //members datafetch
    builder.addCase(fetchMembersAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMembersAction.fulfilled, (state, action) => {
      state.members = action.payload;
      state.isLoading = false;
      return state;
    });
    builder.addCase(fetchMembersAction.rejected, (state) => {
      state.isLoading = false; // Set isLoading to false if there's an error fetching data
    });

    //deployments datafetch 
    builder.addCase(fetchDeploymentsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeploymentsAction.fulfilled, (state, action) => {
      state.deployments = action.payload;
      state.isLoading = false;
      return state;
    });
    builder.addCase(fetchDeploymentsAction.rejected, (state) => {
      state.isLoading = false; // Set isLoading to false if there's an error fetching data
    });


    //feedback datafetch
    builder.addCase(fetchFeedbacksAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFeedbacksAction.fulfilled, (state, action) => {
      state.feedbacks = action.payload;
      state.isLoading = false;
      return state;
    });
    builder.addCase(fetchFeedbacksAction.rejected, (state) => {
      state.isLoading = false; // Set isLoading to false if there's an error fetching data
    });


    //messages datafetch
    builder.addCase(fetchMessagesAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMessagesAction.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
      return state;
    });
    builder.addCase(fetchMessagesAction.rejected, (state) => {
      state.isLoading = false; // Set isLoading to false if there's an error fetching data
    });



    //statlogs datafetch
    builder.addCase(fetchStatLogsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStatLogsAction.fulfilled, (state, action) => {
      state.statLogs = action.payload;
      state.isLoading = false;
      return state;
    });
    builder.addCase(fetchStatLogsAction.rejected, (state) => {
      state.isLoading = false; // Set isLoading to false if there's an error fetching data
    });


    //projects datafetch
    builder.addCase(fetchProjectsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjectsAction.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
      return state;
    });
    builder.addCase(fetchProjectsAction.rejected, (state) => {
      state.isLoading = false; // Set isLoading to false if there's an error fetching data
    });




    
    // playlists and lessons datafetch
    builder.addCase(fetchPlaylistsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlaylistsAction.fulfilled, (state, action) => {
      state.playlists = action.payload;
      state.isLoading = false;
      return state;
    });
    builder.addCase(fetchPlaylistsAction.rejected, (state) => {
      state.isLoading = false; // Set isLoading to false if there's an error fetching data
    });
    
  },
  
});


//selectors

export const selectMembers = (state) => state.members;
export const selectFeedbacks = (state) => state.feedbacks;
export const selectDeployments = (state) => state.deployments;
export const selectStatLogs = (state) => state.statLogs;
export const selectMessages = (state) => state.messages;
export const selectPlaylists = (state) => state.playlists;
export const selectProjects = (state) => state.projects;
export const selectIsLoading = (state) => state.isLoading;
export default appSlice.reducer;
