interface CardProps {
    name: string;
}

function Card({ name }: CardProps): JSX.Element {
    return (
        <div className="card">
            <p>{name}</p>
        </div>
    );
}

export default Card;
