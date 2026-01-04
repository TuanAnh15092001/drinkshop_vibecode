import { AddNewListData, AddNewListVariables, GetMyListsData, AddMovieToListData, AddMovieToListVariables, GetMoviesInListData, GetMoviesInListVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddNewList(options?: useDataConnectMutationOptions<AddNewListData, FirebaseError, AddNewListVariables>): UseDataConnectMutationResult<AddNewListData, AddNewListVariables>;
export function useAddNewList(dc: DataConnect, options?: useDataConnectMutationOptions<AddNewListData, FirebaseError, AddNewListVariables>): UseDataConnectMutationResult<AddNewListData, AddNewListVariables>;

export function useGetMyLists(options?: useDataConnectQueryOptions<GetMyListsData>): UseDataConnectQueryResult<GetMyListsData, undefined>;
export function useGetMyLists(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyListsData>): UseDataConnectQueryResult<GetMyListsData, undefined>;

export function useAddMovieToList(options?: useDataConnectMutationOptions<AddMovieToListData, FirebaseError, AddMovieToListVariables>): UseDataConnectMutationResult<AddMovieToListData, AddMovieToListVariables>;
export function useAddMovieToList(dc: DataConnect, options?: useDataConnectMutationOptions<AddMovieToListData, FirebaseError, AddMovieToListVariables>): UseDataConnectMutationResult<AddMovieToListData, AddMovieToListVariables>;

export function useGetMoviesInList(vars: GetMoviesInListVariables, options?: useDataConnectQueryOptions<GetMoviesInListData>): UseDataConnectQueryResult<GetMoviesInListData, GetMoviesInListVariables>;
export function useGetMoviesInList(dc: DataConnect, vars: GetMoviesInListVariables, options?: useDataConnectQueryOptions<GetMoviesInListData>): UseDataConnectQueryResult<GetMoviesInListData, GetMoviesInListVariables>;
