import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/index'
import App from 'Views/App'

render(
	(
		<BrowserRouter>
			<Provider store={store}>
				<StrictMode>
					<App />
				</StrictMode>
			</Provider>
		</BrowserRouter>
	),
	document.querySelector('#app')
)
