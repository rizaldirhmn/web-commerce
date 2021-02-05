import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";

import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import { Skeleton } from '@material-ui/lab';

const SchemaValidation = yup.object().shape({
	title: yup.string().required("Judul Template harus diisi"),
	text: yup.string().required("Isi Template harus diisi"),
})

const CreateTemplate = props => {
	const {
		open,
		item,
		handleCloseEdit,
		loadingTextFollowUpDetail,
		onFetchDetailTextFollowUp,
		textFollowUpDetail,
		onUpdateTextFollowUp,
	} = props

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
	});

	const [ formState, setFormState ] = useState({
        values: {}
    })

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: 
                event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
          }
        }));
	};

	const onSubmit = () => {
		onUpdateTextFollowUp(item.id, formState.values)
		handleCloseEdit(item)
	}

	useEffect(() => {
		onFetchDetailTextFollowUp(item.id, setFormState)
	}, [onFetchDetailTextFollowUp, item, setFormState])

  return (
    <div>
      <Dialog open={open} onClose={() => handleCloseEdit(item)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Template ({item.title}) </DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<DialogContentText>
							Masukan data dengan benar, data tersebut akan menjadi template Whatsapp Follow Up anda.
						</DialogContentText>
						{loadingTextFollowUpDetail || textFollowUpDetail === null ? (
							<Skeleton></Skeleton>
						):(
							<>
							<TextField
								autoFocus
								fullWidth
								margin="dense"
								label="Judul Template"
								name="title"
								value={formState.values.title || ''}
								onChange={handleChange}
								helperText={
									errors.title && errors.title.message
								}
								error={errors.title && true}
								inputRef={register}
							/>
							<TextField
								margin="dense"
								label="Isi Template"
								name="text"
								multiline
								rows={5}
								fullWidth
								value={formState.values.text || ''}
								onChange={handleChange}
								helperText={
									errors.text && errors.text.message
								}
								error={errors.text && true}
								inputRef={register}
							/>
							</>
						)}
					</DialogContent>
					<DialogActions>
						<Button onClick={() => handleCloseEdit(item)} color="primary">
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Buat
						</Button>
					</DialogActions>
				</form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => ({
    textFollowUpDetail: state.settings.textFollowUpDetail,
	loadingTextFollowUpDetail : state.settings.loadingTextFollowUpDetail,
	loadingTextFollowUpData : state.settings.loadingTextFollowUpData,
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchDetailTextFollowUp : (id, setFormState) => dispatch(actions.fetchDetailText(id, setFormState)),
        onUpdateTextFollowUp : (id, formState) => dispatch(actions.updateTextFollowUp(id, formState)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemplate)