import React, {useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDropzone} from 'react-dropzone';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    content: {
        // margin: theme.spacing(3)
    },
    thumbsContainer : {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    },
    
    thumb : {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 'auto',
        height: 'auto',
        padding: 4,
        boxSizing: 'border-box'
    },
  
    thumbInner : {
        display: 'flex',
            minWidth: 0,
            overflow: 'hidden'
    },
    
    img : {
        display: 'block',
        width: '100%',
        height: '100%'
        },
        appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    paragraph: {
        margin: theme.spacing(2)
    }
}));

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
	padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
	transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function Dropzone(props) {
    const classes = useStyles();
	const { handleChangeBanner } = props;

    const [files, setFiles] = useState([]);

	const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
            accept: 'image/*',
            onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    },
    onDropAccepted: handleChangeBanner,
  });
  // console.log(files)

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  
  const thumbs = files.map(file => (
    <div className={classes.thumb} key={file.name}>
			<div className={classes.thumbInner}>
				<img
                    alt={file.name}
					src={file.preview}
					className={classes.img}
				/>
			</div>
		</div>
	));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className={classes.content}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
					startIcon={<AddIcon />}
				>
					Upload Image
				</Button>
      </div>
      <aside className={classes.thumbsContainer}>
        {thumbs}
      </aside>
		</div>
  );
}