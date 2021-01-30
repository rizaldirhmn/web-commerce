import * as actions from './actionTypes'
import axios from 'axios'
import { setAlert } from './alert'

// Fetching dashboard total user
  export const fetchDashboardTotalUserStart = () => {
      return {
        type: actions.GET_DASHBOARD_TOTAL_USER_START
      }
  }
    
  export const fetchDashboardTotalUserSuccess = (payload) => {
      return {
        type: actions.GET_DASHBOARD_TOTAL_USER_SUCCESS,
        totalUser: payload
      }
  }
    
  export const fetchDashboardTotalUserFail = (error) => {
      return {
        type: actions.GET_DASHBOARD_TOTAL_USER_FAIL,
        error: error
      }
  }
    
  export const fetchDashboardTotalUser = () => async dispatch => {
      dispatch(fetchDashboardTotalUserStart())
      const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/dashboard/total_user`
      try {
          const res = await axios({
              url: endpoint,
              method: "GET",
              headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json', 
                'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
              }
          });
          dispatch(fetchDashboardTotalUserSuccess(res.data))

      } catch (error) {
          dispatch(setAlert("Something went wrong", "error"))
          console.log(error)
          dispatch(fetchDashboardTotalUserFail(error))
          // dispatch({
          //     payload: { msg: error.response.statusText, status: error.response.status },
          //     type: STAGE_ERROR
          // })
      }
      
  }

// Fetching dashboard total transaction
	export const fetchDashboardTotalTransactionStart = () => {
		return {
			type: actions.GET_DASHBOARD_TOTAL_TRANSACTION_START
		}
	}

	export const fetchDashboardTotalTransactionSuccess = (payload) => {
		return {
			type: actions.GET_DASHBOARD_TOTAL_TRANSACTION_SUCCESS,
			totalTransaction: payload
		}
	}

	export const fetchDashboardTotalTransactionFail = (error) => {
		return {
			type: actions.GET_DASHBOARD_TOTAL_TRANSACTION_FAIL,
			error: error
		}
	}

	export const fetchDashboardTotalTransaction = (status) => async dispatch => {
		dispatch(fetchDashboardTotalTransactionStart())
		const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/dashboard/total_transaction?status=${status}`
		try {
				const res = await axios({
						url: endpoint,
						method: "GET",
						headers: { 
							'Content-Type': 'application/json', 
							'Accept' : 'application/json', 
							'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
						}
				});
				dispatch(fetchDashboardTotalTransactionSuccess(res.data))

		} catch (error) {
				dispatch(setAlert("Something went wrong", "error"))
				console.log(error)
				dispatch(fetchDashboardTotalTransactionFail(error))
				// dispatch({
				//     payload: { msg: error.response.statusText, status: error.response.status },
				//     type: STAGE_ERROR
				// })
		}
		
	}

// Fetching Dashboard grafik income
	export const fetchDashboardGrafikIncomeStart = () => {
		return {
			type: actions.GET_DASHBOARD_GRAFIK_INCOME_START
		}
	}

	export const fetchDashboardGrafikIncomeSuccess = (payload) => {
		return {
			type: actions.GET_DASHBOARD_GRAFIK_INCOME_SUCCESS,
			grafikIncome: payload
		}
	}

	export const fetchDashboardGrafikIncomeFail = (error) => {
		return {
			type: actions.GET_DASHBOARD_GRAFIK_INCOME_FAIL,
			error: error
		}
	}

	export const fetchDashboardGrafikIncome = (start_date, end_date) => async dispatch => {
		dispatch(fetchDashboardGrafikIncomeStart())
		const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/dashboard/gross_income?start_date=${start_date}&end_date=${end_date}`
		try {
				const res = await axios({
						url: endpoint,
						method: "GET",
						headers: { 
							'Content-Type': 'application/json', 
							'Accept' : 'application/json', 
							'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
						}
				});
				dispatch(fetchDashboardGrafikIncomeSuccess(res.data))

		} catch (error) {
				dispatch(setAlert("Something went wrong", "error"))
				console.log(error)
				dispatch(fetchDashboardGrafikIncomeFail(error))
				// dispatch({
				//     payload: { msg: error.response.statusText, status: error.response.status },
				//     type: STAGE_ERROR
				// })
		}
		
	}

// Fetching Dashboard grafik income
	export const fetchDashboardProductBestsellerStart = () => {
		return {
			type: actions.GET_DASHBOARD_PRODUCT_BESTSELLER_START
		}
	}

	export const fetchDashboardProductBestsellerSuccess = (payload) => {
		return {
			type: actions.GET_DASHBOARD_PRODUCT_BESTSELLER_SUCCESS,
			productBestseller: payload
		}
	}

	export const fetchDashboardProductBestsellerFail = (error) => {
		return {
			type: actions.GET_DASHBOARD_PRODUCT_BESTSELLER_FAIL,
			error: error
		}
	}

	export const fetchDashboardProductBestseller = (limit) => async dispatch => {
		dispatch(fetchDashboardProductBestsellerStart())
		const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/dashboard/product_terlaris?limit=${limit}`
		try {
				const res = await axios({
						url: endpoint,
						method: "GET",
						headers: { 
							'Content-Type': 'application/json', 
							'Accept' : 'application/json', 
							'Authorization' : `Bearer ${sessionStorage.getItem('access_token')}`
						}
				});
				dispatch(fetchDashboardProductBestsellerSuccess(res.data))
				console.log(res.data)

		} catch (error) {
				dispatch(setAlert("Something went wrong", "error"))
				console.log(error)
				dispatch(fetchDashboardProductBestsellerFail(error))
				// dispatch({
				//     payload: { msg: error.response.statusText, status: error.response.status },
				//     type: STAGE_ERROR
				// })
		}
		
	}
