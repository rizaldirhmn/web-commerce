import * as yup from "yup";

const schema = yup.object().shape({
	name: yup.string().required("Nama tidak boleh kosong"),
	id_agent: yup.string().required("No ID Customer tidak boleh kosong"),
	address: yup.string().required("Alamat tidak boleh kosong"),
	// status: yup.string().required("Tipe Customer tidak boleh kosong"),
	// is_active: yup.string().required("Status Customer tidak boleh kosong"),
});

export default schema;