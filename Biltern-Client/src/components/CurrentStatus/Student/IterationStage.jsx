import React, {useEffect, useState} from 'react';
import FileUpload from "../../../UI/FileUpload";
import ActionButton from '../../../UI/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../../features/alertSlice';
import { getReportDueDate, getReportContent, uploadReportContent, 
    getReportFeedback, getPreviewFeedback } from '../../../apiHelper/backendHelper';

import classes from '../CurrentStatus.module.css';

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This component is responsible for displaying student iteration stage for a student
 */

const IterationStage = (props) => {
    const {id} = props;
    const [dueDate, setDueDate] = useState(null); 
    const [studentFile, setStudentFile] = useState(null);
    const [feedbackFile, setFeedbackFile] = useState(null);
    const [previewFeedback, setPreviewFeedback] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (files) => {
        let formData = new FormData();
        formData.append('file', files[0]);
        uploadReportContent(id, formData, "multipart/form-data")
            .then(res => {
                dispatch(setTimedAlert({msg: "Report uploaded successfully", alertType: "success", timeout: 4000}));
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while uploading report", alertType: "error", timeout: 4000}));
            });
    };

    useEffect(() => {
        getReportDueDate(id)
            .then(res => {
                setDueDate(res.data);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching due date", alertType: "error", timeout: 4000}));
            });

        getReportContent(id, 'arraybuffer', true)
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                setStudentFile(blob);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching report", alertType: "error", timeout: 4000}));
            });
         
        getPreviewFeedback(id, 'arraybuffer', true)
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                setPreviewFeedback(blob);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching preview feedback", alertType: "error", timeout: 4000}));
            });

        getReportFeedback(id, 'arraybuffer', true)
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                setFeedbackFile(blob);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching feedback", alertType: "error", timeout: 4000}));
            });
    }, []);

    const ViewReportHandler = () => {
        navigate("/displayfilepage", {state:{url: URL.createObjectURL(studentFile)}});
    }

    const viewFeedbackHandler = () => {
        navigate("/displayfilepage", {state:{url: URL.createObjectURL(feedbackFile)}});
    }

    const viewPreviewFeedbackHandler = () => {
        navigate("/displayfilepage", {state:{url: URL.createObjectURL(previewFeedback)}});
    }

    const downloadReport = (blob) => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, 'file.pdf');
        } 
        else {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'file.pdf';
            link.click();
        
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                link.remove();
            }, 0);
        }
    }

    const downloadStudentReportHandler = () => {
        downloadReport(studentFile);
    }

    const downloadFeedbackHandler = () => {
        downloadReport(feedbackFile);
    }

    const downloadPreviewFeedbackHandler = () => {
        downloadReport(previewFeedback);
    }

    return (
        <div className={classes.iterationStage}>
            <div className={classes.dueDate}>
                <p>Due Date: {dueDate}</p>
            </div>
            <div className={classes.actions}>
                <div className={classes.buttons}>
                    <ActionButton
                        className=""
                        text="Download Student Report"
                        onClick={downloadStudentReportHandler}
                    />
                    <ActionButton
                        className=""
                        text="View Student Report"
                        onClick={ViewReportHandler}
                    />
                    <ActionButton
                        className=""
                        text="Download Feedback"
                        onClick={downloadFeedbackHandler}
                    />
                    <ActionButton
                        className=""
                        text="View Feedback"
                        onClick={viewFeedbackHandler}
                    />
                    <ActionButton
                        className=""
                        text="Download TA Feedback"
                        onClick={downloadPreviewFeedbackHandler}
                    />
                    <ActionButton
                        className=""
                        text="View TA Feedback"
                        onClick={viewPreviewFeedbackHandler}
                    />
                </div>
                <FileUpload 
                    accept=".pdf" 
                    multiple={false}
                    onSubmit={submitHandler} 
                    dragMessage="Drag and drop a pdf file or click here"
                    uploadMessage="Upload a pdf file"
                    buttonMessage="Upload"    
                />
            </div>    
        </div>
    )
}

export default IterationStage;