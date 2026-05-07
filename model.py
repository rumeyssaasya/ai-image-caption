from transformers import BlipProcessor, BlipForConditionalGeneration

# Görseli AI modelinin anlayacağı formata çevirir
processor = BlipProcessor.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)

# Eğitilmiş modeli yükler
model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)