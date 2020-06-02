import { useEffect as originalUseEffect } from 'react'
import { useSelector as originalUseSelector } from 'react-redux'

export const useEffect = (callback, dependencies) => originalUseEffect(callback, dependencies)
export const useSelector = state => originalUseSelector(state)