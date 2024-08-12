import { utapi } from "@/utils/uploadthing";
import { pipeline } from "@xenova/transformers";
import { count } from "console";
export async function POST(req: Request, res: Response) {
    //get uploaded url from upload thing
    const formData = await req.formData();
    const files: File[] = formData.getAll('files').filter(value => value instanceof File)
    const response = await utapi.uploadFiles(files);

    const responseData = response[0].data;
    const url = responseData?.url;
    console.log(url);

    //dectect object
    const detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
    let outPut: any[] = [];
    if (url) {
        outPut = await detector(url);
    }
    else {
        console.error('URL is undefined');
    }
    //parsing outout with map
    const countObj: { [key: string]: number } = {};
    outPut.forEach(({ score, label }: any) => {
        if (score > 0.80) {
            console.log(outPut);
            if (countObj[label]) {
                countObj[label]++;
            }
            else {
                countObj[label] = 1;
            }
        }
    });
    return new Response(JSON.stringify({
        url: url,
        label: JSON.stringify(countObj),
    }), { status: 200 });
}