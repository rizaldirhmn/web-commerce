import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { connect } from 'react-redux'
import * as actions from '../../../../store/actions'
import { 
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	AccordionActions
 } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
	},
	btn: {
			backgroundColor: '#FF9300',
			color: '#FFFFFF',
			'&:hover': {
				backgroundColor: '#FFA938',
				opacity: 1,
			},
			textTransform: 'none'
	},
}));

const TemplateWA = props => {
  const {
			open,
			item,
      handleCloseWA,
      onFetchListTextFollowUp,
      loadingTextTranslateWA,
			textTranslateWA,
			onSubmitFollowUp
	} = props
	const classes = useStyles()
	const [expanded, setExpanded] = React.useState(false);
	console.log(item)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
	};
	
	// const [ template, setTemplate ] = useState(null)

	// const handleChangeTemplate = event => {
	// 	setTemplate(event.id)
	// }

	const onSubmit = event => {
		// console.log(template)
		onSubmitFollowUp(item.id_checkout, event.id)
		handleCloseWA(item)
	}

  useEffect(() => {
    onFetchListTextFollowUp(item.id_checkout)
	}, [onFetchListTextFollowUp, item])
	
  return (
    <div>
      <Dialog open={open} onClose={() => handleCloseWA(item)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">WhatsApp Template</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pilih template whatsapp follow up.
          </DialogContentText>
					{loadingTextTranslateWA || textTranslateWA === null ? (
						<Skeleton></Skeleton>
					):(
						<>
						{textTranslateWA.map((item, index) => (
							<Accordion expanded={expanded === `panel${index+1}`} onChange={handleChange(`panel${index+1}`)}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
									<Typography className={classes.heading}>
										{item.title}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										{item.translate}
									</Typography>
								</AccordionDetails>
								<AccordionActions>
									<Button className={classes.btn} onClick={() => onSubmit(item)}>
										Pilih
									</Button>
								</AccordionActions>
							</Accordion>
						))}
						</>
					)}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseWA(item)} color="primary">
            Batal
          </Button>
					{/* {template !== null && (
						<Button onClick={onSubmit} color="primary">
							Kirim
						</Button>
					)} */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => ({
    textTranslateWA: state.settings.textTranslateWA,
		loadingTextTranslateWA : state.settings.loadingTextTranslateWA,
		sendWhatsappFollowUp: state.settings.sendWhatsappFollowUp,
		loadingSendWhatsappFollowUp: state.settings.loadingSendWhatsappFollowUp
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchListTextFollowUp : (idCheckout) => dispatch(actions.fetchListTranslateText(idCheckout)),
        onSubmitFollowUp : (id, id_text) => dispatch(actions.sendingWhatsappFollowUp(id, id_text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateWA)