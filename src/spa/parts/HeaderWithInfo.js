import React, {useState} from "react";
import infoImage from "../../images/info_pink.jpg";
import infoImagePressed from "../../images/info_pink_pressed.jpg"
import warnImage from "../../images/warn.png";
import warnImagePressed from "../../images/warn_pressed.png";
import "./HeaderWithInfo.css"

const HeaderWithInfo = ({headerTitle, tooltipMessage, subheader=false, warningMessage}) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [warnTooltipVisible, setWarnTooltipVisible] = useState(false);

    const handleClick = () => {
      if(warnTooltipVisible) {
        setWarnTooltipVisible(false)
      }

        let state = !tooltipVisible;
        setTooltipVisible(state)
    }

    const handleWarnClick = () => {

        if(tooltipVisible) {
            setTooltipVisible(false)
        }

        let state = !warnTooltipVisible;
        setWarnTooltipVisible(state)
    }


    let header = <h1>{headerTitle}</h1>
    if (subheader) {
        header = <h3>{headerTitle}</h3>
    }

    let warningSection;
    if(warningMessage) {
        warningSection = <img
            src={warnTooltipVisible ? warnImagePressed : warnImage}
            alt="Warn"
            style={{width: "35px", height: "35px"}}
            onClick={handleWarnClick}
        />

    }

    return (<div className="header-container">
            {header}
        <img
            src={tooltipVisible ? infoImagePressed : infoImage}
            alt="Info"
            className="info-icon"
            onClick={handleClick}
            style={{marginLeft: "30px"}}
        />
            {warningSection}

            {tooltipVisible && (
                <div className="info visible">
                    {tooltipMessage.split('\n').map((line, index) => (
                        <p key={index} dangerouslySetInnerHTML={{__html: line}}/>
                    ))}
                </div>
            )}
            {warnTooltipVisible && (
                <div className="info visible">
                    {warningMessage.split('\n').map((line, index) => (
                        <p key={index} dangerouslySetInnerHTML={{__html: line}}/>
                    ))}
                </div>
            )}

        </div>
    )
}

export default HeaderWithInfo