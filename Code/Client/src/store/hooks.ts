import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {AppDispatch, RootState} from './store'

// TypeScript specific hooks. Should be used instead of regular ones.
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector