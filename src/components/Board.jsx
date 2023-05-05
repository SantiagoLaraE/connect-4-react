import React from 'react';

const Board = ({children}) => {
    return (
        <div className="board">
            {children}
        </div>
    );
};

export default Board;