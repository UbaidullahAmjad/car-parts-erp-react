/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Spinner, Button, } from "reactstrap"
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { GetArticleViewData_Action, ArticleViewData_LoaderAction, ArticleViewData_ClearAction } from "../../../../redux/HomeSearch/ArticleView/ArticleViewAction"


const ArticlesSectionButton = (props) => {
    const { article_id, engine_id, section_id } = props;
    console.log("ArticlesSectionButton-props", props);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [btnLoading, setBtnLoading] = useState(false)

    const getArticleData = useSelector((state) => state.getArticleData);

    useEffect(() => {
        if(getArticleData?.loading == false) {
            setBtnLoading(false)
        }
    }, [getArticleData?.loading])

    const handleArticleView = (articleId, engineId, sectionId) => {
        setBtnLoading(true)
        if (btnLoading == false) {
            dispatch(ArticleViewData_LoaderAction())
            dispatch(GetArticleViewData_Action(articleId, engineId, sectionId, navigate))
        }
    }

    return (
        <Button
            color='primary'
            onClick={() => handleArticleView(article_id, engine_id, section_id)}
        ><VisibilityIcon />
            {
                btnLoading == true && (
                    <span className='btn_overlay'><Spinner /></span>
                )
            }
        </Button>
    )
}

export default ArticlesSectionButton