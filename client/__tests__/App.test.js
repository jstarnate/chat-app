import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, waitFor, cleanup } from '@testing-library/react'
import axios from 'axios'
import '@testing-library/jest-dom/extend-expect'
import App from '../js/views/App'
import store from 'Store/index'
import * as hooks from '../__mocks__/hooks'

jest.mock('axios')

afterEach(cleanup)

test('Renders correctly', async () => {
	// delete window.location

	// window.location = { href: 'http://localhost/home' }

 //    expect(window.location.href).toBe('http://localhost/home')

	// global.window = Object.create(window)
 //    Object.defineProperty(window, 'location', { writable: true, value: {href: 'http://localhost/home'} })

 //    expect(window.location.href).toBe('http://localhost/home')

	const Wrapper = () => (
		<BrowserRouter>
			<Provider store={store}></Provider>
		</BrowserRouter>
	)

	const user = {
		_id: '5e866a82cba07a13a323f440',
		first_name: 'Josh',
		last_name: 'Lockman',
		username: 'Lora10',
		image_path: null
	}

	axios.get.mockResolvedValueOnce({ data: { user } })

	const useSelector = jest.spyOn(hooks, 'useSelector').mockImplementation(callback => callback({ user }))
	const useEffect = jest.spyOn(hooks, 'useEffect').mockImplementation(jest.fn(), [])

	useEffect()

	const { debug, queryByTestId } = render(<App />, { wrapper: Wrapper })

	expect(useEffect).toHaveBeenCalled()
	expect(useSelector(state => state.user)).toEqual(user)
	debug()
})