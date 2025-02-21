import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from "@/utils/constants";
import {HYDRATE} from "next-redux-wrapper";

function isHydrateAction(action) {
    return action.type === HYDRATE
}

export const postsSlice = createApi({
    reducerPath: 'postsSlice',
    keepUnusedDataFor: false,
    baseQuery: fetchBaseQuery(
        { baseUrl: API_URL}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (isHydrateAction(action)) {
            return action.payload[reducerPath]
        }
    },
    
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ({category, page, limit}) => `category?slug=${category}&page=${page}&limit=${limit}`,
        }),
        getSinglePost: builder.query({
            query: ({slug}) => ({
                url: `posts/${slug}`,
            }),
        }),
        getLatestPosts: builder.query({
            query: ({category, limit}) => `getLast2Data?category=${category}&limit=${limit || 2}`,
        }),
        getJurisdictions: builder.query({
            query: () => `jurisdictions`,
        }),
        getFaq: builder.query({
            query: (limit) => `faq${limit ? "/" + limit : ""}`,
        }),
        togglePostLike: builder.mutation({
            query: (body) => (
                {
                    url: `like`,
                    method: 'POST',
                    body,
                }
            )
        })
    }),
})

export const {
    useGetPostsQuery,
    useGetLatestPostsQuery,
    useGetJurisdictionsQuery,
    useGetFaqQuery,
    useTogglePostLikeMutation
} = postsSlice;