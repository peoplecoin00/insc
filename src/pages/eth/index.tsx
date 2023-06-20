import { Box, Button, Typography } from "@mui/material"
import { useCallback, useMemo, useState } from "react";
import Web3 from "web3";

declare global {
    interface Window {
        ethereum: any;
    }
}

export default  function EthPage() {
    // const receiver = '0xB3A6C05c1b795b08c9Ed936478A244529EDA20C0'; // Your receiver address
    
    const [header, __header] = useState(localStorage.getItem('header') || 'data:,')
    const [json, __json] = useState(localStorage.getItem('json') || JSON.stringify({
        "p":"erc-20",
        "op":"mint",
        "tick":"",
        "id":"",
        "amt":""
    }))
    const jsonArr = useMemo(() => {
        try {
            const j = JSON.parse(json) as Object
            return Object.keys(j).map((k) => {
                return {
                    k,
                    v: ((j as any)[k] as string) || '',
                }
            })
        } catch (error) {
            return []
        }
    }, [json])

    console.log('jsonArr---', jsonArr)

    const [receiver, __receiver] = useState(localStorage.getItem('receiver') || '')
    const [dataString, __dataString] = useState(localStorage.getItem('dataString') || '')
    
    const hex = useMemo(() => Web3.utils.asciiToHex(dataString), [dataString]) 

    const Connect =  async () => {
        if(!receiver){
            return alert('Receiver ERROR')
        }
        localStorage.getItem('receiver')
        localStorage.getItem('dataString')

        localStorage.getItem('header')
        localStorage.getItem('json')
        
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                const sender = accounts[0];
                const value = web3.utils.toWei('0', 'ether');
                const data = web3.utils.asciiToHex(dataString);
                const tx = await web3.eth.sendTransaction({from: sender, to: receiver, value: value, data: data});
                console.log(`Transaction hash: ${tx.transactionHash}`);
                alert(`Transaction hash: ${tx.transactionHash}`)
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('MetaMask is not installed!');
        }
        
    }

    return <Box sx={{ p: '20px' }}>
        <Box sx={{
            mt: '40px', 
            display: 'flex',
        }}>
            <Box sx={{ mr: '200px', width: '700px'}}>
                <Typography component="h1" sx={{ mb: '10px', fontWeight: 500, fontSize: '18px' }}>Generate Dta information</Typography>
                <Typography component="h1" sx={{ mt: '20px', mb: '10px', fontWeight: 500, fontSize: '14px' }}>Header</Typography>
                <input value={header} placeholder="Header" onInput={(e) => {
                    let { value } = e.target as any
                    __header(value)
                }} />
                <Typography component="h1" sx={{ mt: '20px', mb: '10px', fontWeight: 500, fontSize: '14px' }}>JSON</Typography>
                {jsonArr.map(({k, v}, index) => <Box key={index} sx={{ display: 'flex', mb: '10px' }}>
                    <input value={k} style={{ width: '100px' }} onInput={(e) => {
                        let { value } = e.target as any
                        let newJson = {}
                        jsonArr.map((ii, _index) => {
                            if(index == _index) {
                                (newJson as any)[value] = ii.v
                                return {
                                    k: value,
                                    v: ii.v,
                                }
                            }
                            (newJson as any)[ii.k] = ii.v
                            return ii
                        })
                        __json(JSON.stringify(newJson))
                    }} />
                    <Typography sx={{ m:'0px 10px' }}>:</Typography>
                    <input value={v} onInput={(e) => {
                        let { value } = e.target as any
                        let newJson = {}
                        jsonArr.map((ii, _index) => {
                            if(index == _index) {
                                (newJson as any)[ii.k] = value
                                return {
                                    k: value,
                                    v: ii.v,
                                }
                            }
                            (newJson as any)[ii.k] = ii.v
                            return ii
                        })
                        __json(JSON.stringify(newJson))
                    }}/>
                    <Button onClick={() => {
                        let list = jsonArr.filter((_, _index) => _index !== index)
                        let newJson = {}
                        list.forEach((ii) => {
                            (newJson as any)[ii.k] = ii.v
                        })
                        __json(JSON.stringify(newJson))
                    }}>del</Button>
                    <Button onClick={() => {
                        let list = jsonArr
                        let newJson = {}
                        list.forEach((ii, __index) => {
                            (newJson as any)[ii.k] = ii.v
                            if(__index === index){                            
                                (newJson as any)[""] = ""
                            }
                        })
                        __json(JSON.stringify(newJson))
                    }}>add row</Button>
                </Box>)}
                
                <Button sx={{ mt: '20px' }} variant="contained" onClick={() => {
                    __dataString(header + json)
                }}>To Data</Button>
            </Box>
            <Box sx={{ width: '500px', }}>
                <Typography component="h1" sx={{ mb: '10px', fontWeight: 500, fontSize: '18px' }}>Raw Data</Typography>
                <textarea style={{width: '500px', height: '300px', padding: '20px'}} placeholder="Data" value={dataString} onInput={(e) => {
                    let { value } = e.target as any
                    __dataString(value)
                }} />
                <Typography component="h1" sx={{ mb: '10px', mt: '10px', fontWeight: 500, fontSize: '18px' }}>Raw Data Hex</Typography>
                <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: 'rgba(0,0,0,0.1)', p: '10px' }}>{hex}</Typography>
            </Box>
        </Box>
        <Box sx={{
            mt: '40px'
        }}>
            <Typography component="h1" sx={{ mb: '10px', fontWeight: 500, fontSize: '18px' }}>Receiver</Typography>
            <input style={{width: '700px', height: '50px', padding: '20px' }} placeholder="Receiver Address" value={receiver} onInput={(e) => {
                let { value } = e.target as any
                __receiver(value)
            }} />
        </Box>
        <Button sx={{
            mt: '40px'
        }} variant="contained" onClick={() => Connect()}>Inscribed</Button>
    </Box>
}