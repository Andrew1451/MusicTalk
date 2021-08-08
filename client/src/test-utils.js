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
      //   allPosts: [
      //     {
      //       post_id: 'ze4q2',
      //       post: 'This is a test post',
      //       username: 'Shred Flanders',
      //       user: 'VanHalen',
      //       likeErr: null,
      //       liked: false
      //     }
      //   ]
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