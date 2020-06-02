import React from 'react'
import axios from 'axios'
import { act } from 'react-dom/test-utils'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import Index from '../js/views/Index'
import '@testing-library/jest-dom'

jest.mock('axios')

describe('Index.js', () => {
    afterEach(cleanup)

    it('Should render the component correctly', () => {
        const { getByTestId, queryByTestId } = render(<Index />)

        expect(getByTestId('form')).toBeInTheDocument()
        expect(getByTestId('submit-button').disabled).toBeTruthy()
        expect(queryByTestId('auth-error')).not.toBeInTheDocument()
        expect(queryByTestId('username-error')).not.toBeInTheDocument()
        expect(queryByTestId('password-error')).not.toBeInTheDocument()
    })

    it('Inputs should handle values correctly', () => {
        const { getByTestId } = render(<Index />)
        const username = getByTestId('username-input')
        const password = getByTestId('password-input')

        fireEvent.change(username, { target: {value: 'user123'} })
        expect(username.value).toBe('user123')

        fireEvent.change(password, { target: {value: 'password123'} })
        expect(password.value).toBe('password123')
    })

    it('Submit button should be enabled when all inputs are not empty', () => {
        const { getByTestId } = render(<Index />)
        const username = getByTestId('username-input')
        const password = getByTestId('password-input')

        fireEvent.change(username, { target: {value: 'user123'} })
        expect(getByTestId('submit-button').disabled).toBeTruthy()

        fireEvent.change(password, { target: {value: 'password123'} })
        expect(getByTestId('submit-button').disabled).toBeFalsy()
    })

    it('Should render empty username and password error messages', async () => {
        const { getByTestId, queryByTestId } = render(<Index />)

        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    username: { message: 'Username is required.' },
                    password: { message: 'Password is required.' }
                }
            }
        })

        await act(async () => {
            fireEvent.submit(getByTestId('form'))
        })

        const usernameError = await waitFor(() => queryByTestId('username-error'))
        expect(usernameError).toBeInTheDocument()

        const passwordError = await waitFor(() => queryByTestId('password-error'))
        expect(passwordError).toBeInTheDocument()
    })

    it('Should render empty password error message', async () => {
        const { getByTestId, queryByTestId } = render(<Index />)

        axios.post.mockRejectedValueOnce({
            response: {
                data: { password: { message: 'Password is required.' } }
            }
        })

        await act(async () => {
            fireEvent.submit(getByTestId('form'))
        })

        const usernameError = await waitFor(() => queryByTestId('username-error'))
        expect(usernameError).not.toBeInTheDocument()

        const passwordError = await waitFor(() => queryByTestId('password-error'))
        expect(passwordError).toBeInTheDocument()
    })

    it('Should render empty username error message', async () => {
        const { getByTestId, queryByTestId } = render(<Index />)

        axios.post.mockRejectedValueOnce({
            response: {
                data: { username: { message: 'Username is required.' } }
            }
        })

        await act(async () => {
            fireEvent.submit(getByTestId('form'))
        })

        const usernameError = await waitFor(() => queryByTestId('username-error'))
        expect(usernameError).toBeInTheDocument()

        const passwordError = await waitFor(() => queryByTestId('password-error'))
        expect(passwordError).not.toBeInTheDocument()
    })

    it('Should render incorrect combination error message', async () => {
        const { getByTestId, queryByTestId } = render(<Index />)

        axios.post.mockRejectedValueOnce({
            response: { data: { auth: 'Incorrect combination.' } }
        })

        await act(async () => {
            fireEvent.submit(getByTestId('form'))
        })

        const authError = await waitFor(() => queryByTestId('auth-error'))
        expect(authError).toBeInTheDocument()

        const usernameError = await waitFor(() => queryByTestId('username-error'))
        expect(usernameError).not.toBeInTheDocument()

        const passwordError = await waitFor(() => queryByTestId('password-error'))
        expect(passwordError).not.toBeInTheDocument()
    })

    // it('Should login the correct combination', async () => {
    //     const { getByTestId, queryByTestId } = render(<Index />)

    //     axios.post.mockResolvedValueOnce({
    //         response: { data: { auth: 'Login successful!' } }
    //     })

    //     fireEvent.change(getByTestId('username-input'), { target: {value: 'Lora10'} })
    //     fireEvent.change(getByTestId('password-input'), { target: {value: 'password'} })

    //     await act(async () => {
    //         fireEvent.submit(getByTestId('form'))
    //     })
    // })
})
