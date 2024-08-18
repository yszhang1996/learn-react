import React, { useMemo } from 'react'
import SelectIcon from '@/components/SelectIcon'
import './DiseaseList.less'

function DiseaseList({ iconType, color, text, isActive, onChange }: { iconType: number, color: string, text: string, onChange: () => void, isActive: boolean }) {

    const colorTransRGB = useMemo(() => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }, [color])
    return (
        <div className={`DiseaseList ${isActive ? `actived` : ``}`} onClick={onChange}>
            <div className="tabs-top tabs-top-bg1" style={{ background: `rgba(${colorTransRGB?.r},${colorTransRGB?.g},${colorTransRGB?.b},0.2)` }}>
                <SelectIcon iconType={iconType} color={color} />
            </div>
            <div className="tabs-bottoms">
                <span>{text}</span>
            </div>
        </div>
    )
}

export default DiseaseList