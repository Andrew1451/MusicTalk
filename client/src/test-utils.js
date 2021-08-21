import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './reducer'
import { BrowserRouter as Router } from 'react-router-dom';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState: {
      auth: {
        user: 'VanHalen',
        isLoggedIn: true
      },
      // posts: {
      //   userPosts: [{
      //     post_id: 'a1b2c3',
      //     created_at: '8/12/21 12:28',
      //     post: 'Test post',
      //     username: 'Shred Flanders',
      //     likeErr: null,
      //     liked: false
      // }],
      //   allPosts: [{
      //       post_id: 'a1b2c3',
      //       post: 'Test post',
      //       username: 'Shred Flanders',
      //       likeErr: null,
      //       liked: false
      //   }]
      // }
    }}),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><Router>{children}</Router></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }