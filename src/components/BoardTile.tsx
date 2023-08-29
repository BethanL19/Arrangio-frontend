interface BoardTileProps {
    name: string;
}

function BoardTile({ name }: BoardTileProps): JSX.Element {
    return (
        <div className="board-tile">
            <h3>{name}</h3>
        </div>
    );
}

export default BoardTile;
