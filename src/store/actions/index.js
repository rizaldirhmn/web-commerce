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
  addProductCollectionEdit
} from './Product/collectionProduct'

export {
  fetchDashboardTotalUser,
  fetchDashboardTotalTransaction,
  fetchDashboardGrafikIncome,
  fetchDashboardProductBestseller,
  fetchDashboardResellerActive
} from './dashboard'

export {
  addCategory,
  onClearImageCategory,
  uploadCategoryImage,
  getDetailCategory,
  updateCategory,
  deleteImageCategory
} from './Master/category'