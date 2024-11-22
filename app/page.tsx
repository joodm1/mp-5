"use client";

import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rebeccapurple;
    min-height: 100vh;
    padding: 4% 0;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 3%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 50%;
    background: white;
    color:black;
    padding: 2%;
    
    
    
    border-radius: 0.5rem; #makes things look better and slayer

    
   
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;

    font-size: calc(3px+ 4vw);
`;

const Input = styled.input`
    border: 1px solid lightslategrey;
    padding: 2%;
    border-radius: 0.5rem;
    font-size: calc(1px +  1vw);
    
    color:teal;
    margin-top: 1%;

    @media screen and (max-width: 750px) {
        width:100%;
        font-size: calc(1px + 1.5vw);


    }

    
`;

const Button = styled.button`
    background-color: #3b82f6;
    color: white;
    margin:5%;
    padding: 3%;
    align-items: center;
    font-size: calc(1% +  1.5vw);


    

    border-radius: 0.5rem;



    #adding some dazzle with hover effects i'm cooking
    &:hover {
        background-color: #2563eb;
    }
`;

const ErrorMessage = styled.p`
    color: darkred;
    text-align: center;
    margin-top: 4% ;
    font-size: calc(1px + 1.5vw); #for some reason it's slow
`;

const URLbox = styled.div`
    background-color: cadetblue;
    margin-top: 4%;
    padding: 1%;
    text-align: center;
    width:50%;
    border-radius: 0.5rem; #makes things pretty again
    
    #making its children look pretty toooo
    a {
        color: white;
        text-decoration: underline;

        &:hover {
            color: grey;
        }
    }
    
    p{
        color: lightcyan;
        margin-bottom: 2%;
    }
    @media screen and (max-width: 750px) {
        width:40%;
        font-size: calc(1px + 1.5vw); #for some reason it's slow
        
        
    }

`;

export default function Home() {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        setError(null);
        setShortenedUrl(null);



        try {
            const response = await fetch("/api/alias", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ alias, url }),
            }
            );

            const result= await response.json();

            if (response.ok){
                setShortenedUrl(`${window.location.origin}/${alias}`);
            }else{
                setError(result.error || "An error occurred.");
            }
        }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (noSlay){ //catchng stray errors apparet
            setError("Failed to shorten the URL. Please try again.");
        }
    };

    return (
        <Container>
            <Title>URL Shortener</Title>
            <Form onSubmit={handleSubmit}>
                <Label>
                    Alias:
                    <Input
                        type="text"
                        name="alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        required // shows a cutesy notif
                        placeholder="Enter your alias (e.g., my-link)"
                    />
                </Label>
                <Label>
                    Original URL:
                    <Input
                        type="url"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        placeholder="Enter the URL (e.g., https://example.com)"
                    />
                </Label>
                <Button type="submit">Shorten URL</Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>


            {shortenedUrl && (



                <URLbox>

                    <p>Your shortened URL :</p>
                    <a href={shortenedUrl}   target="_blank" > {/*wanted to open it in a different window*/}

                        {shortenedUrl}
                    </a>
                </URLbox>
            )}
        </Container>
    );
}