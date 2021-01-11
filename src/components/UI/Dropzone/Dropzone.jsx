import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { makeStyles } from '@material-ui/core'

const styles = makeStyles((theme) => ({
    container: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: '2px',
        borderRadius: '2px',
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        height: 250
    }
}))

// const thumbsContainer = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   marginTop: 16
// }

// const thumb = {
//   display: 'inline-flex',
//   borderRadius: 2,
//   border: '1px solid #eaeaea',
//   marginBottom: 8,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4,
//   boxSizing: 'border-box'
// }

// const thumbInner = {
//   display: 'flex',
//   minWidth: 0,
//   overflow: 'hidden'
// }

// const img = {
//   display: 'block',
//   width: 'auto',
//   height: '100%'
// }

const Dropzone = props => {
    const classes = styles()
    const { fileType, multiple, handleChangeBanner } = props

    const [files, setFiles] = useState([])
    const { getRootProps, getInputProps } = useDropzone({
        // maxSize: 1000000,
        accept: fileType,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        },
        onDropAccepted: handleChangeBanner,
        multiple: multiple,
    })

    // const thumbs = files.map(file => (
    //   <div style={thumb} key={file.name}>
    //     <div style={thumbInner}>
    //       <img
    //         src={file.preview}
    //         style={img}
    //       />
    //     </div>
    //   </div>
    // ))

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])
    // console.log(files);
    return (
        <section className={classes.container}>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </section>
    )
}

export default Dropzone
