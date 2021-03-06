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

// Fetching Dashboard Product Bestseller
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

// Fetching Dashboard Reseller Active
	export const fetchDashboardResellerActiveStart = () => {
		return {
			type: actions.GET_DASHBOARD_RESELLER_ACTIVE_START
		}
	}

	export const fetchDashboardResellerActiveSuccess = (payload) => {
		return {
			type: actions.GET_DASHBOARD_RESELLER_ACTIVE_SUCCESS,
			resellerActive: payload
		}
	}

	export const fetchDashboardResellerActiveFail = (error) => {
		return {
			type: actions.GET_DASHBOARD_RESELLER_ACTIVE_FAIL,
			error: error
		}
	}

	export const fetchDashboardResellerActive = (limit) => async dispatch => {
		dispatch(fetchDashboardResellerActiveStart())
		const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/dashboard/reseller_teractive?limit=${limit}`
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
				dispatch(fetchDashboardResellerActiveSuccess(res.data))

		} catch (error) {
				dispatch(setAlert("Something went wrong", "error"))
				console.log(error)
				dispatch(fetchDashboardResellerActiveFail(error))
				// dispatch({
				//     payload: { msg: error.response.statusText, status: error.response.status },
				//     type: STAGE_ERROR
				// })
		}
		
	}

// Fetching Dashboard Popular product
	export const fetchDashboardPopularProductStart = () => {
		return {
			type: actions.GET_DASHBOARD_POPULAR_PRODUCT_START
		}
	}

	export const fetchDashboardPopularProductSuccess = (payload) => {
		return {
			type: actions.GET_DASHBOARD_POPULAR_PRODUCT_SUCCESS,
			popularProduct: payload
		}
	}

	export const fetchDashboardPopularProductFail = (error) => {
		return {
			type: actions.GET_DASHBOARD_POPULAR_PRODUCT_FAIL,
			error: error
		}
	}

	export const fetchDashboardPopularProduct = (limit) => async dispatch => {
		dispatch(fetchDashboardPopularProductStart())
		const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/dashboard/product_show_terbanyak`
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
				dispatch(fetchDashboardPopularProductSuccess(res.data))

		} catch (error) {
				dispatch(setAlert("Something went wrong", "error"))
				console.log(error)
				dispatch(fetchDashboardPopularProductFail(error))
				// dispatch({
				//     payload: { msg: error.response.statusText, status: error.response.status },
				//     type: STAGE_ERROR
				// })
		}
		
	}

// Fetching Dashboard Interested product
	export const fetchDashboardInterestedProductStart = () => {
		return {
			type: actions.GET_DASHBOARD_INTERESTED_PRODUCT_START
		}
	}

	export const fetchDashboardInterestedProductSuccess = (payload) => {
		return {
			type: actions.GET_DASHBOARD_INTERESTED_PRODUCT_SUCCESS,
			interestedProduct: payload
		}
	}

	export const fetchDashboardInterestedProductFail = (error) => {
		return {
			type: actions.GET_DASHBOARD_INTERESTED_PRODUCT_FAIL,
			error: error
		}
	}

	export const fetchDashboardInterestedProduct = (limit) => async dispatch => {
		dispatch(fetchDashboardInterestedProductStart())
		const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/dashboard/product_share_terbanyak`
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
				dispatch(fetchDashboardInterestedProductSuccess(res.data))

		} catch (error) {
				dispatch(setAlert("Something went wrong", "error"))
				console.log(error)
				dispatch(fetchDashboardInterestedProductFail(error))
				// dispatch({
				//     payload: { msg: error.response.statusText, status: error.response.status },
				//     type: STAGE_ERROR
				// })
		}
		
	}

// Fetching Dashboard Transaction Monthly
	export const fetchDashboardGrafikTransactionMonthlyStart = () => {
		return {
			type: actions.GET_DASHBOARD_GRAFIK_TRANSACTION_MONTHLY_START
		}
	}

	export const fetchDashboardGrafikTransactionMonthlySuccess = (payload) => {
		return {
			type: actions.GET_DASHBOARD_GRAFIK_TRANSACTION_MONTHLY_SUCCESS,
			grafikTransactionMonthly: payload
		}
	}

	export const fetchDashboardGrafikTransactionMonthlyFail = (error) => {
		return {
			type: actions.GET_DASHBOARD_GRAFIK_TRANSACTION_MONTHLY_FAIL,
			error: error
		}
	}

	export const fetchDashboardGrafikTransactionMonthly = (year) => async dispatch => {
		dispatch(fetchDashboardGrafikTransactionMonthlyStart())
		const endpoint = `${process.env.REACT_APP_BASE_URL}api/admin/dashboard/count_transaction?year=${year}`
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
			dispatch(fetchDashboardGrafikTransactionMonthlySuccess(res.data))

		} catch (error) {
			dispatch(setAlert("Something went wrong", "error"))
			console.log(error)
			dispatch(fetchDashboardGrafikTransactionMonthlyFail(error))
			// dispatch({
			//     payload: { msg: error.response.statusText, status: error.response.status },
			//     type: STAGE_ERROR
			// })
		}
		
	}