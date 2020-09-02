import * as yup from "yup";

const schema = yup.object().shape({
	// id_product: yup.string().required("Produk harus dipilih"),
	qty: yup.string().required("Qty harus diisi"),
});

export default schema;