import * as yup from "yup";

const schema = yup.object().shape({
	// id_product: yup.string().required("Produk harus dipilih"),
	description: yup.string().required("Nama Produk harus diisi"),
	// value: yup.string().required("Harga harus diisi"),
});

export default schema;