import React from 'react'

function Recipe(props) {
return (
    <div style={{ 
        border: '1px solid #ccc', 
        borderRadius: '10px', 
        padding: '16px', 
        width: '170px',
        height: '120px',
        position: 'relative',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5))',
    }}>
        <img 
            src={props.imageUrl} 
            alt={props.title} 
            style={{ 
                width: '100%',
                height: '100%',
                position: 'absolute', 
                top: 0,
                left: 0,
                borderRadius: '10px', 
                objectFit: 'cover' ,
            }} 
        />
        <h2 style={{ 
            margin: '0',
            color: 'white',
            fontSize: '1rem', 
            position: 'absolute',
            bottom: '0',
            right: '0em' ,
            background:'linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.99))',
            width: 'calc(100% - 0.5em)',
            padding: '2em .5em .5em 0',
            borderRadius: '10px', 
            textAlign: 'right'
        }}>
            {props.title}
        </h2>
    </div>
)
}

export default Recipe