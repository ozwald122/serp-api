import {useState} from "react";
import {Response, SearchResponse} from "../types/Response";
import SearchInformation from "../types/SearchInformation";
import OrganicResult from "../types/OrganicResult";
import {Button, Form, Spinner, Table} from "react-bootstrap";

const Search = () => {
    const [information, setInformation] = useState<SearchInformation>();
    const [data, setData] = useState<OrganicResult[]>([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const search = () => {
        console.log('Searching');
        setLoading(true);
        fetch("https://electronic-serp-api.herokuapp.com/api/search?keyword=" + keyword.trim())
            .then((res: any) => res.json())
            .then((json: Response<SearchResponse>) => {
                if (json.success && json.data) {
                    setInformation(json.data.search_information);
                    setData(json.data.organic_results);
                } else {
                    setData([]);
                    setInformation(undefined);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const getManufacturer = (result: OrganicResult) => {
        const regex = /(manufacturer|hersteller):([\w\d\s]+)[\W\D]?/gi;
        const matches = [...result.snippet.matchAll(regex)];
        if (matches.length > 0) {
            return matches[0][2];
        }
        return '-'
    }

    const getManufacturerNumber = (result: OrganicResult) => {
        const regex = /(HerstellerNr\.|Manufacturer no\.|Artikelnummer|Hersteller Art\.Nr\.):([\w\d\s]+)[\W\D]?/gi;
        const matches = [...result.snippet.matchAll(regex)];
        if (matches.length > 0) {
            return matches[0][2];
        }
        return '-'
    }

    return (
        <div>
            <h3>Device Input</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Search</Form.Label>
                    <Form.Control placeholder="Enter a device ID" type="text"
                                  onChange={(e) => setKeyword(e.target.value)} value={keyword} required/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Button type="button" onClick={search}>Search</Button>
                </Form.Group>
            </Form>
            {loading ? (
                <Spinner/>
            ) : (
                <section className="mt-3">
                    <h3>Results</h3>
                    <div>
                        <p>Total: {information?.total_results ?? 'N/A'} - Time
                            taken: {information?.time_taken_displayed ?? 'N/A'}</p>
                    </div>
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Retailer name</th>
                            <th>Price</th>
                            <th>Manufacturer item no.</th>
                            <th>Manufacturer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((result, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <a target="_blank" href={result.link}>{result.source}</a>
                                </td>
                                <td>{result.rich_snippet?.top?.detected_extensions?.currency}{result.rich_snippet?.top?.detected_extensions?.price}</td>
                                <td>{getManufacturerNumber(result)}</td>
                                <td>{getManufacturer(result)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </section>
            )}
        </div>
    )
}

export default Search
