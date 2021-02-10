export {
  setAlert,
  removeAlert,
  setDialogBox,
  removeDialogBox
} from './alert'

export {
  auth
} from './auth'

export {
  getProduct,
  uploadProductImage,
  deleteImageProduct,
  editDeleteImageProduct
} from './Product/product'

export {
  fetchCollection,
  addCollection,
  uploadProductCollectionImage,
  onClearImageProductCollection,
  deleteImageCollection,
  fetchDetailCollection
} from './Product/collection'

export {
  uploadCollectionProductList,
  deleteProductList,
  editDeleteProductCollection,
  addProductCollectionEdit,
  onClearProductList
} from './Product/collectionProduct'

export {
  fetchDashboardTotalUser,
  fetchDashboardTotalTransaction,
  fetchDashboardGrafikIncome,
  fetchDashboardProductBestseller,
  fetchDashboardResellerActive,
  fetchDashboardPopularProduct,
  fetchDashboardInterestedProduct,
  fetchDashboardGrafikTransactionMonthly
} from './dashboard'

export {
  addCategory,
  onClearImageCategory,
  uploadCategoryImage,
  getDetailCategory,
  updateCategory,
  deleteImageCategory
} from './Master/category'

export {
  fetchBannerList,
  addBanner,
  fetchDetailBanner,
  editBanner,
  deleteBanner
} from './Master/banner'

export {
  fetchBlogList,
  addBlogList,
  deleteBlogList,
  fetchDetailBlog,
  editBlogList
} from './blog'

export {
  sendNotifProduct,
  sendNotifProductCollection,
  sendNotificationInformation
} from './notification'

export {
  fetchListText,
  fetchListVariable,
  addTextFollowUp,
  fetchDetailText,
  updateTextFollowUp,
  deleteTextFollowUp,
  fetchListTranslateText
} from './settings'

export {
  fetchSocialMediaList,
  uploadSocialMediaImage,
  deleteImageSocialMedia,
  onClearImageSocialMedia,
  addSocialMedia,
  fetchSocialMediaDetail,
  uploadSocialMediaImageEdit,
  editSocialMedia,
  deleteSocialMedia
} from './socialMedia'

export { 
  fetchUserList,
  fetchUserRoleList,
  addUser,
  fetchDetailUser,
  editUser
} from './user'

export { 
  sendingWhatsappFollowUp
} from './PaymentConfirmation/PaymentConfirmationAction'