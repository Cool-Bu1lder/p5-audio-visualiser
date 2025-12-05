import { pipeline } from '@huggingface/transformers'

// https://huggingface.co/docs/transformers.js/api/pipelines#module_pipelines.TextGenerationPipeline
const generator = await pipeline('text-generation', 'Xenova/distilgpt2')
const textInput = 'I enjoy walking with my cute dog,'
const output = await generator(textInput)
