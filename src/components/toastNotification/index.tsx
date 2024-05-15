/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'
import { IToastType, toastSelector, ToastShow } from '../../redux/slices/ToastSlice'

const ToastNotification = (props: PropsFromRedux) => {
  const { toastMessage, removeToast } = props

  useEffect(() => {
    if (toastMessage.message) {
      if (toastMessage.type === 'error') {
        toast.error(toastMessage.message)
      } else {
        toast.success(toastMessage.message)
      }
      // it is necessary to un comment because back to back toast not working if we comment it.
      setTimeout(() => {
        removeToast({ message: null, type: null })
      }, 500)
    }
  }, [toastMessage?.message])

  return (
    <ToastContainer
      className='!z-[9999999]'
      position='top-right'
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
    />
  )
}

const mapStateToProps = createStructuredSelector({
  toastMessage: toastSelector,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeToast: (data: IToastType) => dispatch(ToastShow(data)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(ToastNotification)
